import noimg from '../no-image-icon-23485.png';

export const keywords = {
    Java: 'Java',
    React: 'ReactJS',
    Nest: 'NestJS',
    MaterialUI: 'Material UI',
    Bootstrap: 'Bootstrap',
    NPM: 'NPM',
    AWS: 'AWS',
    Composer: 'Composer',
    Yii: 'Yii',
    Mapbox: 'Mapbox',
    Leaflet: 'Leaflet',
    PHP: 'PHP',
    MySql: 'MySQL',
    Javascript: 'Javascript',
    Typescript: 'Typescript',
};

export function getKeywords(){
        return [
        {
            keyword: keywords.Java,
            ico: "https://img.icons8.com/ios/50/000000/java-coffee-cup-logo--v1.png",
        },
        {
            keyword: keywords.React,
            ico: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
        },
        {
            keyword: keywords.Nest,
            ico: "https://iconape.com/wp-content/files/kr/371166/svg/371166.svg",
        },
        {
            keyword: keywords.MaterialUI,
            ico: "https://material-ui.com/static/logo_raw.svg",
        },
        {
            keyword: keywords.Bootstrap,
            ico: "https://img.icons8.com/color/452/bootstrap.png",
        },
        {
            keyword: keywords.NPM,
            ico: "https://img.icons8.com/windows/32/000000/npm.png",
        },
        {
            keyword: keywords.AWS,
            ico: "https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_aws_icon_130732.png",
        },
        {
            keyword: keywords.Composer,
            ico: "https://cdn.iconscout.com/icon/free/png-256/composer-285363.png",
        },
        {
            keyword: keywords.Mapbox,
            ico: "https://cdn.icon-icons.com/icons2/2699/PNG/512/mapbox_logo_icon_169974.png",
        },
        {
            keyword: keywords.Leaflet,
            ico: "https://pbs.twimg.com/profile_images/780792637481689088/8y-GChEY.jpg",
        },
        {
            keyword: keywords.Yii,
            ico: "https://symbols.getvecta.com/stencil_103/23_yii-icon.798126c135.svg",
        },
        {
            keyword: keywords.PHP,
            ico: "https://image.flaticon.com/icons/png/512/919/919830.png",
        },
        {
            keyword: keywords.MySql,
            //ico: "https://img.icons8.com/ios/50/000000/java-coffee-cup-logo--v1.png",
        },
    ]
}

export function getItemByKeyword(keyword) {
    const ks = getKeywords();
    for (let i = 0; i < ks.length; i++){
        if (ks[i].keyword == keyword)
            return ks[i];
    };
}

export function getIco(keyword){
    const i = getItemByKeyword(keyword);
    if (i && i.ico)
        return i.ico;
    return noimg;
}

export function keywordSorted() {
    return getKeywords().sort(function(a, b){
        var x = a.keyword.toLowerCase();
        var y = b.keyword.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
}

export function isKeywordSelected(keywords, selection, keyword){
    for (let i = 0; i < keywords.length; i++){
        const k = keywords[i].keyword;
        if (k == keyword)
            return selection[i];
    }
}
 