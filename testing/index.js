// Include it and extract some methods for convenience
const server = require('server');
const { get, post } = server.router;

// Launch server with options and a couple of routes
server({ port: 8080 }, [
  get('/', ctx => {
    console.log(ctx.data);
    const response = {
      team: "Zolocotrocos",
      uptime: "false",
      versions: [
        {
          name: "Track ID - 1",
          tag: "0123456789",
          success: true
        },
        {
          name: "Track ID - 2",
          tag: "1234567890",
          success: true
        },
        {
          name: "Track ID - 3",
          tag: "2345678901",
          success: true
        }
      ]
    };
    return response;
  })
]);
