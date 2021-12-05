module.exports = {
    purge: [
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: false, // or 'media' or 'class'
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                'promask' : '#4E31FF',
                'nomask' :'#EA3CB7',
                'light':  '#CFFF58'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
