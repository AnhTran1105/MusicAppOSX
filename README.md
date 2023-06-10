Chú ý: Yêu cầu máy đã cài đặt NodeJS, Python, Pip và MongoDB:

- Để mở server:

  - Nếu chưa kích hoạt môi trường ảo env, ở thư mục gốc của dự án chạy lệnh:
    .\env\Scripts\activate
  - Nếu terminal báo lỗi ở bước trên thì chạy lệnh sau ở powershell của máy với quyền administrator:
    set-executionpolicy remotesigned
    Nhấn Y và nhấn Enter.
    Sau đó chạy lại bước trên.
  - Ở thư mục gốc của của dự án chạy các lệnh sau để cài các package cần thiết:
    cd backend
    pip install -r requirements.txt
  - Kết nối với MongoDB:
    - Khởi động MongoDB, chú ý connect ở localhost:27017.
    - Tạo 1 database có tên là "MusicAppOSX", collection với tên tùy ý.
    - Trong terminal tại folder backend chạy các lệnh:
      python manage.py makemigrations
      python manage.py migrate
  - Sau khi kết nối thành công, chạy lệnh sau để start server:
    python manage.py runserver
  - Server sẽ chạy ở localhost:8000.

- Để mở frontend:

  - Ở thư mục gốc của dự án chạy các lệnh:
    cd frontend
    npm install
    npm run build
    npm start
  - Server sẽ chạy ở localhost:3000.

- Sau khi mở frontend xong sẽ xuất hiện trang đăng nhập, chọn đăng kí tài khoản, đăng kí thành công sẽ tự động chuyển đến trang chủ.

- Note:
  - Đảm bảo server đã được mở để load dữ liệu từ api ra trang web.
  - Đảm bảo mongoDB đã được kết nối để thực hiện các chức năng liên quan đến cơ sở dữ liệu.
  - Nếu server báo lỗi "Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH environment variable? Did you forget to activate a virtual environment": đảm bảo đã kích hoạt môi trường ảo, nhấn Ctrl + Shift + P trong VSCode, nhập vào 'interpreter' sau đó chọn phiên bản Python tương ứng với môi trường ảo env (dòng có hiển thị recommend).
