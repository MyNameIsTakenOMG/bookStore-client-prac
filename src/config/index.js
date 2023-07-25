const environmentUrls = new Map();

environmentUrls.set('localhost', 'http://localhost:8080');
environmentUrls.set(
  'bookstore-client-prac-service.onrender.com',
  'https://bookstore-server-prac-service.onrender.com'
);

export default environmentUrls.get(window.location.hostname);
