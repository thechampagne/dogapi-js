/*
 * Copyright 2022 XXIV
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const https = require("https");

const http = async (endpoint) => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://dog.ceo/api/${endpoint}`,
      {
        method: "GET",
      },
      (res) => {
        const body = [];
        res.on("data", (chunk) => body.push(chunk));
        res.on("end", () => {
          const resString = Buffer.concat(body).toString();
          resolve(resString);
        });
      }
    );

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject("Looks like the server is taking to long to respond");
    });
    req.end();
  });
};

class DogAPIException extends Error {
  constructor(message) {
    super(message);
  }
}

/**
 * DISPLAY SINGLE RANDOM IMAGE FROM ALL DOGS COLLECTION
 *
 * @returns random dog image
 * @throws DogAPIException on failure
 */
async function randomImage() {
  try {
    let response = await http("breeds/image/random");
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * DISPLAY MULTIPLE RANDOM IMAGES FROM ALL DOGS COLLECTION
 *
 * @param imagesNumber number of images
 * @returns multiple random dog image `NOTE` ~ Max number returned is 50
 * @throws DogAPIException on failure
 */
async function multipleRandomImages(imagesNumber) {
  try {
    let response = await http(`breeds/image/random/${imagesNumber}`);
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * RANDOM IMAGE FROM A BREED COLLECTION
 *
 * @param breed breed name
 * @returns random dog image from a breed, e.g. hound
 * @throws DogAPIException on failure
 */
async function randomImageByBreed(breed) {
  try {
    let response = await http(`breed/${breed.trim()}/images/random`);
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * MULTIPLE IMAGES FROM A BREED COLLECTION
 *
 * @param breed breed name
 * @param imagesNumber number of images
 * @returns multiple random dog image from a breed, e.g. hound
 * @throws DogAPIException on failure
 */
async function multipleRandomImagesByBreed(breed, imagesNumber) {
  try {
    let response = await http(
      `breed/${breed.trim()}/images/random/${imagesNumber}`
    );
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * ALL IMAGES FROM A BREED COLLECTION
 *
 * @param breed breed name
 * @returns an array of all the images from a breed, e.g. hound
 * @throws DogAPIException on failure
 */
async function imagesByBreed(breed) {
  try {
    let response = await http(`breed/${breed.trim()}/images`);
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * SINGLE RANDOM IMAGE FROM A SUB BREED COLLECTION
 *
 * @param breed breed name
 * @param subBreed sub_breed name
 * @returns random dog image from a sub-breed, e.g. Afghan Hound
 * @throws DogAPIException on failure
 */
async function randomImageBySubBreed(breed, subBreed) {
  try {
    let response = await http(
      `breed/${breed.trim()}/${subBreed.trim()}/images/random`
    );
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * MULTIPLE IMAGES FROM A SUB-BREED COLLECTION
 *
 * @param breed breed name
 * @param subBreed sub_breed name
 * @param imagesNumber number of images
 * @returns multiple random dog images from a sub-breed, e.g. Afghan Hound
 * @throws DogAPIException on failure
 */
async function multipleRandomImagesBySubBreed(breed, subBreed, imagesNumber) {
  try {
    let response = await http(
      `breed/${breed.trim()}/${subBreed.trim()}/images/random/${imagesNumber}`
    );
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * LIST ALL SUB-BREED IMAGES
 *
 * @param breed breed name
 * @param subBreed sub_breed name
 * @returns an array of all the images from the sub-breed
 * @throws DogAPIException on failure
 */
async function imagesBySubBreed(breed, subBreed) {
  try {
    let response = await http(
      `breed/${breed.trim()}/${subBreed.trim()}/images`
    );
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * LIST ALL BREEDS
 *
 * @returns object of all the breeds as keys and sub-breeds as values if it has
 * @throws DogAPIException on failure
 */
async function breedsList() {
  try {
    let response = await http("breeds/list/all");
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

/**
 * LIST ALL SUB-BREEDS
 *
 * @param breed breed name
 * @returns an array of all the sub-breeds from a breed if it has sub-breeds
 * @throws DogAPIException on failure
 */
async function subBreedsList(breed) {
  try {
    let response = await http(`breed/${breed.trim()}/list`);
    let data = JSON.parse(response);
    if (data.status != "success") {
      throw new Error(data.message);
    }
    if (data.message.length === 0)
      throw new DogAPIException("the breed does not have sub-breeds");
    return data.message;
  } catch (err) {
    throw new DogAPIException(err);
  }
}

module.exports = {
    randomImage,
    randomImageByBreed,
    randomImageBySubBreed,
    multipleRandomImages,
    multipleRandomImagesByBreed,
    multipleRandomImagesBySubBreed,
    imagesByBreed,
    imagesBySubBreed,
    breedsList,
    subBreedsList
}