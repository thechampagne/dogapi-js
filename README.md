# Dog API

[![](https://img.shields.io/github/v/tag/thechampagne/dogapi-js?label=version)](https://github.com/thechampagne/dogapi-js/releases/latest) [![](https://img.shields.io/github/license/thechampagne/dogapi-js)](https://github.com/thechampagne/dogapi-js/blob/main/LICENSE)

Dog API client for **JavaScript**.

### Download
[npm](https://npmjs.com/package/dogapi.js/)

```
npm install dogapi.js
```

### Example

```js
const { multipleRandomImages } = require("dogapi.js");

multipleRandomImages(10).then(dogs => {
  dogs.forEach(dog => {
      console.log(dog);
  });
});
```

### License

Dog API client is released under the [Apache License 2.0](https://github.com/thechampagne/dogapi-js/blob/main/LICENSE).

```
 Copyright 2022 XXIV

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
```