const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set('authorization', process.env.API_CLARIFAI);

// const Clarifai = require('clarifai');
// console.log(Clarifai)

const handleApiCall = (req, res) => {
    stub.PostModelOutputs(
        {
            // This is the model ID of a publicly available General model. You may use any other public or custom model ID.

            user_app_id: {
                user_id: process.env.USER_ID,
                app_id: process.env.APP_ID,
            },

            model_id: 'face-detection',
            inputs: [{ data: { image: { url: req.body.input } } }],
        },
        metadata,
        (err, response) => {
            if (err) {
                console.log('Error: ' + err);
                return;
            }

            if (response.status.code !== 10000) {
                console.log(
                    'Received failed status: ' +
                        response.status.description +
                        '\n' +
                        response.status.details
                );
                return;
            }

            console.log('Predicted concepts, with confidence values:');
            for (const c of response.outputs[0].data.concepts) {
                console.log(c.name + ': ' + c.value);
            }
            res.json(response)
        }
    );

    // const imageurl = req.body.input;
    // fetch(
    //     'https://api.clarifai.com/v2/models/' + 'face-detection' + '/outputs',
    //     returnClarifaiRequestOptions(imageurl)
    // )
    //     .then((response) => response.text())
    //     .then((result) => {
    //         res.json(result);
    //     })
    //     .catch((err) => res.status(400).json('unable to work with API'));
};

// const returnClarifaiRequestOptions = (imageUrl) => {
//     // Your PAT (Personal Access Token) can be found in the portal under Authentification
//     const PAT = '';
//     const USER_ID = '';
//     const APP_ID = 'face-recognition-brain';
//     const IMAGE_URL = imageUrl;

//     const raw = JSON.stringify({
//         user_app_id: {
//             user_id: USER_ID,
//             app_id: APP_ID,
//         },
//         inputs: [
//             {
//                 data: {
//                     image: {
//                         url: IMAGE_URL,
//                     },
//                 },
//             },
//         ],
//     });

//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             Authorization: 'Key ' + PAT,
//         },
//         body: raw,
//     };

//     return requestOptions;
// };

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then((entries) => {
            res.json(entries[0].entries);
        })
        .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
    handleApiCall,
    handleImage,
};
