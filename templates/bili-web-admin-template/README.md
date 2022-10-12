# bili-web-admin-template

#### Dự án sẽ được chia theo dạng module vì vậy:

mỗi khi tạo thêm 1 chức năng mới, việc đầu tiên cần làm là tạo folder với tên chức năng đó trong folder src (như đã demo với folder home-page và new-user)
**convention để naming 1 folder:** dùng chữ cái viết thường và nếu có 2 từ trở lên thì dùng dấu gạch ngang để nối các từ lại với nhau
**bên trong folder chức năng mới vừa tạo:** gồm có:

- **folder components** ( chỉ chứa các file chứa các component),
- **folder hooks** (chứa các custom hook dùng riêng cho chức năng đó)
- **file interface** (dùng để định nghĩa các type dùng riêng cho chức năng đó)
- **file reducer** (dùng để khai báo reducer, action theo cú pháp redux toolkit của riêng chức năng đó)
- **file service** (dùng để khai báo các hàm call api (query function), sau đó được truyền vào các custom hook để sử dụng react query được khai báo trong folder hooks )
- **folder schema** (dùng để chứa các schema dùng để validation form)

**bên trong folder common gồm có**:

- **folder components**: dùng để define các component chung nhất mà cả dự án phải sử dụng nhiều
- **folder config**: bên trong là file routes.config.ts dùng để khai báo các routes
- **folder constants**: gồm
  - **common.constants.ts**: dùng để define các constant hay sử dụng trong dự án
  - **querykey.constants.ts**: dùng để define các query key để call api bằng react query
  - **routes.constants.ts**: dùng để define tên các routes
  - **urlAPI.ts**: dùng để define các điểm cuối của api
- **folder hooks**: dùng để define các hooks dùng nhiều trong dự án
- **i18n**: define các cụm từ cần dịch nghĩa
- **interface folder**: define các type chung cho dự án
- **redux folder**: define store của toàn bộ project
- **services**: define các file dùng để tương tác với api
- **theme folder**: config các style sử dụng chung cho dự án theo cơ chế của chakra ui

#Summary:

- Sử dụng `Yarn` để quản lý dependencies
- Dự án được chia theo dạng module
- Sử dụng redux toolkit để quản lí state, action, reducer
- Sử dụng react query để get, post, patch,... với api
- Sử dụng chakra ui để code ui
- Sử dụng react router để navigate giữa các trang với nhau
- Sử dụng i18n để thay đổi ngôn ngữ của dự án
- Sử dụng husky để commit đến git
- Sử dụng react hook form và yup để validate form
