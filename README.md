# supa images loader

simple function for load images

### install with npm

```
install supa-images-loader --save
```

### install with yarn

```
yarn add supa-images-loader
```

### example

```js
import loadImages from 'supa-images-loader'

const div = document.querySelector('#example')

div.innerText = 'loading...'

loadImages(
 'https://ucarecdn.com/fd6c74d1-3c88-4f2c-8f81-48064132fd0d/-/resize/402x/',
 'https://ucarecdn.com/4a15dea0-4e61-4ee1-ac49-71d2daa6462e/-/resize/402x/',
 'https://ucarecdn.com/250cbd47-4779-4d15-9666-de9c0c9b2f84/-/resize/402x/'
).then(images => {
  div.innerText = ''

  return images
}).then(
  images => images
    .filter(([, error]) => !error)
    .forEach(([image]) => div.appendChild(image))
)
```