import * as tf from '@tensorflow/tfjs';

const globalModelKey = '__my_global_model_key__';

// Generate a mock dataset with user interaction features and labels
const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    const technique = Math.floor(Math.random() * 3); // 0: Text, 1: Audio, 2: Video
    const engagementLevel = Math.floor(Math.random() * 3); // 0: Low, 1: Medium, 2: High
    const timeSpent = Math.random() * 10; // Time spent on the learning material

    const label = engagementLevel === 2 && timeSpent > 5 ? 1 : 0;

    data.push({
      features: [technique, engagementLevel, timeSpent],
      label: label,
    });
  }
  return data;
};

const createModel = () => {
  if (window[globalModelKey]) {
    return window[globalModelKey];
  }

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 32, activation: 'relu', inputShape: [3] }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

  window[globalModelKey] = model;
  return model;
};

let isTraining = false; // Flag to check if a fit() call is ongoing

const trainModel = async (model, data) => {
  if (isTraining) return; // Don't start a new fit() call if one is ongoing
  isTraining = true; // Set the flag to true to indicate a fit() call is ongoing

  const { features, labels } = data.reduce(
    (acc, item) => {
      acc.features.push(item.features);
      acc.labels.push(item.label);
      return acc;
    },
    { features: [], labels: [] }
  );

  const xs = tf.tensor2d(features);
  const ys = tf.tensor1d(labels);

  await model.fit(xs, ys, {
    epochs: 200,
    batchSize: 32,
    shuffle: true,
    verbose: 0,
  });

  xs.dispose();
  ys.dispose();

  isTraining = false; // Reset the flag to false after fit() call is finished
};


const predict = (model, inputData) => {
  const inputTensor = tf.tensor2d([inputData]);
  const prediction = model.predict(inputTensor);
  return prediction.dataSync()[0];
};

const contentTypes = [0, 1, 2]; // 0: Text, 1: Audio, 2: Video

const simulateUserInteractions = (model) => {
  const userProfile = getUserProfile();
  const preferredLearningStyle = userProfile ? userProfile.learningStyle : null;

  // If the user has a preferred learning style, use it as the best content type
  if (preferredLearningStyle) {
    return mapLearningStyleToContentType(preferredLearningStyle);
  }
  let maxScore = -Infinity;
let bestContentType = null;


  contentTypes.forEach((contentType) => {
    let score = 0;
    let iterations = 100;

    for (let i = 0; i < iterations; i++) {
      const engagementLevel = Math.floor(Math.random() * 3); // 0: Low, 1: Medium, 2: High
      const timeSpent = Math.random() * 10; // Time spent on the learning material

      const inputData = [contentType, engagementLevel, timeSpent];
      const predictedValue = predict(model, inputData);

      if (predictedValue > 0.5) {
        score++;
      } else {
        score--;
      }
    }

    if (score >= maxScore) {
      maxScore = score;
      bestContentType = contentType;
    }
  });

  return bestContentType;
};
const getUserProfile = () => {
  const userProfile = localStorage.getItem('userProfile');
  return userProfile ? JSON.parse(userProfile) : null;
};
const runPrediction = async (interactionData) => {
  const mockData = generateMockData();
  const model = createModel();

  // Wait for the model to finish training before running prediction
  await trainModel(model, mockData);

  // Simulate user interactions with different content types
  const bestContentType = simulateUserInteractions(model);
  console.log('Best Content Type:', bestContentType);

  // Calculate the difference between the user's answer and the correct answer
  const answerDiff = Math.abs(interactionData.userAnswer - interactionData.correctAnswer);
  // Set the engagement level based on the answer difference
  const engagementLevel = answerDiff === 0 ? 2 : answerDiff === 1 ? 1 : 0;
  const timeSpent = Math.random() * 10; // Time spent on the learning material

  const inputData = [bestContentType, engagementLevel, timeSpent];
  const predictedValue = predict(model, inputData);

  return predictedValue > 0.5 ? bestContentType : null;
};



const mapLearningStyleToContentType = (learningStyle) => {
  switch (learningStyle) {
    case 'visual':
      return 2; // video
    case 'auditory':
      return 1; // audio
    case 'kinesthetic':
      return 1; // interactive
    case 'reading-writing':
      return 0; // text
    default:
      return 1; // interactive
  }
};


export { runPrediction, mapLearningStyleToContentType };

