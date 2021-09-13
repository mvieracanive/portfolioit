# Protfolio Website for software developers

Protfolio Website is developed using [Create React App](https://github.com/facebook/create-react-app). It can be used to set a web portfolio for any software developer.

Portfolio Website builds-in featrures to add content for job examples, information about professional, send an email for contact, links to GitHub, Blog, NPM and LinkedIn.

## How to add content for feature "About Me"

Inside folder _src/content/about_ is found all information that would detail who is the professional and its studies. The content that must be provided include - A profile image - A folder with all images of postgraduate qualifications - An _index.js_ file

The _index.js_ file exports all the information in variables _aboutText_, _photoProfile_, _certificates_. _Certificates_ in an array of objects for the certificate image and a title for such image, indicating what is the certification about.

<code>
import about from './about.txt';
import photo from './imgPerfil.jpg';
import cert00 from './certificates/cert00.JPG';

export const aboutText = about;
export const photoProfile = photo;

export const certificates = [
{
title: "Software Quality Manegement",
cert: cert00
},
]
</code>

### `To be continued...`
