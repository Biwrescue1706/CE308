module.exports = function (api){
    api.cache(true);
    return{
        preset:[
            ["babel-preset-expo",{jsxImportSource : "nativewind"}],
            "nativewind/babel",
        ]
    }
}