/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'books.google.com',
            port: '',
            pathname: '/books/content/**',
          },
        ],
      },
}

module.exports = nextConfig


// "http://books.google.com/books/content?id=MWB0AAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"