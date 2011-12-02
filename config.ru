use Rack::Static, 
  :urls => ["/css", "/css/images", "/css/light", "/images", "/DatePicker", "/DatePicker/css", "/DatePicker/js", "/DatePicker/images", "/charts/css", "/charts/js", "/js", "/popular.html"],
  :root => "public"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}