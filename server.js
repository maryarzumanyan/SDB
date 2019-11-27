const express = require("express");

var app = express();

var port = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("client/content"));

/////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!///////////////////////////////

var projsByCat = {};
var imagesByStepInProj = {};

var design = [];
var visualize = [];
var build = [];


const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}


function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


function listFiles(root, auth, param1, param2, callback) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    q: "'" + root + "' in parents and trashed != true",
    pageSize: 10,
    fields: 'nextPageToken, files(mimeType, id, name, parents, webContentLink)',
    // fields: 'nextPageToken, files(*)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    callback(param1, param2, files);  
  });
}

function listFolders(root, auth, param, callback) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
    q: "mimeType contains 'application/vnd.google-apps.folder' and \'" + root + "\' in parents and trashed != true",
  //  pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
    //fields: 'nextPageToken, files(*)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    callback(param, files);
  });
}

function SetData() {
  // Reset all containers
  projsByCat = {};
  imagesByStepInProj = {};
  design = [];
  visualize = [];
  build = [];
  
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), auth => listFolders("1VyBNsI7shE1C1s_zrnl23ngP9EbZU4jy", auth, undefined, (_unused, categories) => {
        for(var cat of categories) {
          ////////// get projects for a category                            projsByCat( [cat]-> prjs[] )        ////////////
          listFolders(cat.id, auth, cat, (cat, projects) => {
            console.log(`Projects for category ${cat.name} : ${projects}`);
            projsByCat[cat.name] = [];
            for(var prj of projects) {
              projsByCat[cat.name].push(prj.name);
              imagesByStepInProj[prj.name] = [];
              ////////  get steps in a project                              Design[]  Visualize[]   Build[]  /////
              listFolders(prj.id, auth, prj, (prj, steps) => {
                console.log(`Steps for project ${prj.name} : ${steps}`);
                for(var step of steps) {
                  if(step.name === "Design") {
                    design.push(prj.name);
                  } else if(step.name === "Visualize") {
                    visualize.push(prj.name);
                  } else{
                    build.push(prj.name);
                  }
                  ///// get images for each step in a project               imagesByStepInProj ( [proj]-> [[step]-> images[]] )     ////  
                  listFiles(step.id, auth, prj, step, (prj, step, images) => {
                    var imagesByStep = {};
                    imagesByStep[step.name] = [];
                    if (!imagesByStepInProj[prj.name]) {
                      imagesByStepInProj[prj.name] = []
                    }

                    imagesByStepInProj[prj.name].push(imagesByStep);

                    for(var img of images) {
                      imagesByStep[step.name].push(img.webContentLink);
                    }

                    console.log(`Projects By Category: ${JSON.stringify(projsByCat)}`);
                    console.log(`Images By Step: ${imagesByStepInProj}`);
                  });
                }
              })   
            }
          });
        }
      }
    ));
  });
}



/////////////////////// get routes !!!!  //////////////////////////////////////////
app.get('/api/categories  ', (req, res) => {
  res.json(projsByCat);
});

app.get('/api/data', (req, res) => {
  res.json(
    {
      projsByCat: projsByCat,
      imagesByStepInProj: imagesByStepInProj,
      design: design,
      visualize: visualize,
      build: build
    });
});

app.get('/api/images', (req, res) => {

  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), auth => listFiles("1VyBNsI7shE1C1s_zrnl23ngP9EbZU4jy",
      auth,
      undefined,
      undefined,
      (_unused1, _unused2, files) => { res.send(files.map(file => file.webContentLink)) }
    ));
  });
});

app.get('/api/folders', (req, res) => {

  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), auth => listFolders("1VyBNsI7shE1C1s_zrnl23ngP9EbZU4jy",
      auth,
      undefined,
      (_unused, files) => { res.send(files.map(file => file.webContentLink)) }
    ));
  });

SetData();
});


app.listen(port, () => console.log(`Listening on port ${port}`));
