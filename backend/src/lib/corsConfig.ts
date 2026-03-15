const corsConfig = {
    origin: '*',
    methods: [ 'GET', 'PUT', 'POST', 'DELETE' ],
    allowedHeaders: [ 'Content-Type', 'Authorization' ],
    credentials: true,
};

export { corsConfig };