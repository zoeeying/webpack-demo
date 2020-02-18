console.log('Hello Zoe')

// 浏览器支持serviceWorker的话，就使用一下
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('service-worker register success')
      }).catch(err => {
        console.log('service-worker register error')
      })
  })
}