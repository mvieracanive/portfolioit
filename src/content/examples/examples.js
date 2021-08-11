import { keywords as Keys } from '../keywords';
import img00 from './images/img00.png';
import cod00 from './codes/code00';

export const Examples = [
    {
        heading: 'Cuban entrepreneurs alternative - MVC framework',
        text: 'This web site allows new entrepreneurs create accounts, services and offers with its prices and locate their business address in a map. Also it allows advertise those services and search for them. It is build using a MVC framework.',        
        img: img00,
        websiteurl: 'https://needincuba.com',
        websitetitle: 'NeedInCuba',
        keywords: [
            Keys. Yii, 
            Keys.Composer, 
            Keys.Bootstrap, 
            Keys.Mapbox, 
            Keys.Leaflet, 
            Keys.PHP,
            Keys.MySql
        ]
    },
    {
        heading: 'Backdrop component for executing async function in React static app',
        text: 'This component is useful in a React static application were you need to call a function asynchronously and is mandatory to wait for its response in order to execute the next action or show the next view. In that case, your user interface needs to freeze and wait until such method finishes, otherwise the application could crash or give the wrong answer or show the wrong result.',
        code: cod00,
        sandbox: 'https://codesandbox.io/s/exciting-fog-kyp67?file=/src/App.js:282-707',
        sandboxtitle: 'Running example of component',
        keywords: [Keys.React, Keys.Javascript, Keys.MaterialUI]
    },
];