requirejs.config({
    baseUrl: './',
    paths: {
        jquery: '/tools/jquery',
        react: '/tools/react',
        'lunch-picker': '/src'
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});