To run this visualisation you will need to install node.js and github bash.

Once you have installed these two programs you need to clone this github reposiroty into a folder that suits you:

    git clone https://github.com/Williams94/InfoVis.git


Next you should open up the node.js command prompt into the folder where you clone the git repo, then you can run:

    node app.js

This should start the server at localhost:8080/ which you can go to in your browser can access the visualisation.

If you have any problems use the console to find out what they are, it may be that you need to install some of the
project dependencies using npm.

For example if it says you do not have express.js open up your node terminal to the location of the git repo and type:

    npm express

This will download express, or you can change express to another package dependency if it says you dont have it.

    npm install

should work the same to fix any errors.