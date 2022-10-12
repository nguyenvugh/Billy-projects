## 1. Work flow của dự án

### 1.1 Tóm tắt

![](/git-tutorial/assets/git-flow.png)

- **master**: Thông thường khi làm việc team work với nhau, thường trên repository của dự án sẽ có 1 branch **`master`** ( branch này sẽ là branch đc tạo ra đầu tiên thường dành cho việc deploy lên product )

- **develop**: branch này sẽ được checkout từ branch **`master`** thường được dùng trong lúc phát triển dự án, developer sẽ checkout branch của mình từ branch này

> - Khi làm một feature mới, dev sẽ đứng từ **develop** và checkout sang branch mới, sau khi code trên branch mới xong, sẽ merge ngược lại vào **develop**

### 1.1 Các step khi bắt đầu thực hiện 1 task

**1**. `git checkout develop`

> Chuyển về nhánh cơ sở

**2**. `git pull`

> Đảm bảo code trên **develop** luôn là mới nhất trước khi tách branch, điều này giúp đảm bảo code luôn mới nhất và hạn chế conflict khi merge code

**3**. `git checkout -b feature/create-crud-topic`

> Tách ra 1 branch mới, đồng thời di chuyển vị trí hiện tại sang branch đó luôn

**4**. `git add .` và `git commit -m "message"`

> Thực hiện câu lệnh này khi đã hoàn thành xong code

**5**. `git push origin feature/create-crud-topic`

> Đẩy lên remote, luôn làm điều này trc khi làm step tiếp theo, việc này giúp lấy lại code dễ dàng nếu có lỗi trong các step tiếp theo

**6**. `git checkout develop && git pull`

> Sang nhánh base và kéo code mới nhất về, đảm bảo code mới nhất trước khi merge với branch con.

**7**. `git checkout feature/create-crud-topic && git merge develop`

> Thực hiện chuyển sang branch của mình sau đó merge với branch base (develop) đã có code mới nhất
> Có thể thay thế **git merge** bằng **git rebase** nhưng sẽ nói thêm ở phần tiếp theo

**8** `Thực hiện fix conflict, sau đó git add . và git commit lên như bình thường`

**9**. `git push origin feature/create-crud-topic`

> Đẩy code đã được fix conflict với branch muốn merge vào (develop) sau đó tạo pull request trên github

## 2. Rebase và Merge

- Về cơ bản thì `git rebase` và `git merge` đều dùng để đưa commit của 1 branch này sang branch khác (gộp code), nhưng 2 thằng này nó có cách sử dụng riêng và tính chất khác nhau

### 2.1. Git rebase

- Git Rebase là một chức năng được dùng khi gắn nhánh đã hoàn thành công việc vào nhánh gốc . Về mặt nội dung thì là việc điều chỉnh nhánh công việc gắn vào với nhánh gốc nên các commit sẽ được đăng kí theo thứ tự gắn vào . Chính vì thế sẽ có đặc trưng là dễ nhìn hơn sau khi xác nhận commit
  ![](/git-tutorial/assets/git-rebase.png)

- Các bước để thực hiện rebase: Giả sử chúng ta đang ở branch `feature/create-crud-topic` và đã hoàn thành code, đã commit và push lên origin, chúng ta cũng đã sang `develop` và pull code mới nhất về, việc tiếp theo là muốn merge vào với `develop` bằng cách sử dụng `rebase`

**1**. `git rebase develop`

> Thực hiện rebase với branch gốc so (branch mà nhánh hiện tại tách ra). Lúc này hình dung là code trên develop sẽ đi qua từng commit của branch hiện tại, để so sánh, nếu có conflict ở commit nào thì sẽ dừng lại ở đó để chúng ta có thể fix confict

**2**. `git status`

> Thực hiện check những file bị conflict và fix chúng

**3**. Sau khi fix conflict xong `git add .`

> Thực hiện add các file đã fix conflict

**4**. `git add .`

> Thực hiện add các file đã fix conflict

**5**. `git rebase --continue`

> Thực hiện đi đến các commit tiếp theo

**6**. Lặp lại từ bước **2** đến bước **5** cho đến khi việc rebase được hoàn thành

**7**. `git push -f origin feature/create-crud-topic`

> Thực hiện push code lên origin và tạo pull request

### 2.2. Git merge

- Git Merge là một lệnh dùng để hợp nhất các chi nhánh độc lập thành một nhánh duy nhất trong Git.

  <img src="/git-tutorial/assets/reabase-merge.png" width="100%" height="500" >

- Khác với rebase, `git merge` sẽ so sánh 3 commit, commit mà branch con bắt đầu tách ra, commit mới nhất của branch con, commit mới nhất của branch cha, sau đó sẽ tạo ra 1 commit để gộp 3 commit này lại với nhau.

> Cách dùng `git merge` đã nêu ở phần 1

### 2.3. Tổng kết

- Để so sánh thì `git merge` sẽ dễ dùng và an toàn hơn là so với `git rebase`. vì nó k thay đổi lịch sử commit. Nhưng đổi lại nếu dùng merge thì `git tree` sẽ nhìn k đẹp và gọn gàng như `git rebase`

- **Merge**
  <img src="/git-tutorial/assets/merge-success.png" width="400" height="300" >
- **Rebase**
  <img src="/git-tutorial/assets/rebase-success.png" width="400" height="300" >

> **git merge** sẽ phù hợp hơn với các bạn mới và chưa quá nắm rõ về git.

## 3. Một số câu lệnh git hay dùng và hữu ích

### 3.1. `git reset`

- Dùng trong trường hợp khi mà muốn quay trở lại 1 commit cụ thể nào đó nào đó, ví

- Ví dụ muốn quay lại commit `C3` : `git reset --hard 7c52435`
  ![](/git-tutorial//assets//before-reset.png)

- Kết quả:

![](/git-tutorial//assets//after-reset.png)

> có thể thay `--hard` thành `--soft` để giữ các thay đổi

### 3.2. `git stash`

- Dùng trong trường hợp khi mà bạn đang code ở branch này mà muốn checkout sang branch khác trong khi k muốn commit thay đổi. (kiểu như lưu lại xong lấy ra sau)

1. `git stash` lưu thay đổi của branch hiện tại
2. `git checkout` sang branch khác
3. quay lại branch cũ và `git stash pop` để lấy lại những code đã lưu

### 3.3. `git commit --amend`

- Dùng khi mà có thay đổi nhưng k muốn tạo 1 commit mới. Ví dụ:

-- Trước khi `amend`, commit `C3` đang có nội dung như sau

<img src="/git-tutorial/assets/before-amend.png" width="400">

> sửa file và `git add .` như bình thường, sau đó dùng lệnh `git commit --amend`. đc kết quả như sau:

<img src="/git-tutorial/assets/after-amend.png" width="400">

> nội dung file đã thay đổi nhưng commit vẫn được giữ nguyên

### 3.4. `git cherry-pick`

- Dùng trong trường hợp khi mà chúng ta muốn lấy commit của 1 branch này sang branch khác. Ví dụ:

- branch `beta` đang có commit `B2` với nội dung:
  <img src="/git-tutorial/assets/before-cherry.png" width="400" height="500">

- Lấy commit `B2` của `beta` vào `master`

  > `git checkout master` > `git cherry-pick e58b547` > `git cherry-pick --continue` (nếu có conflict, phải fix và `git add .`, sau đó chạy lệnh này)

- Kết quả là ở branch `master` đã có commit `B2` và nội dung của `B2`

<img src="/git-tutorial/assets/after-cherry.png" width="400" height="500">

### 3.5. `git rebase -i `

- Dùng trong trường hợp muốn gộp nhiều commit lại thành 1 commit

## 4. Một số quy ước khi sử dụng git trong dự án

### 4.1. Đặt tên branch

- Khi tạo ra 1 branch mới, tên của branch phải theo format sau:

- `feature/branch-name`: Khi mà làm một feature mới
- `fix/branch-name`: Khi mà fix lỗi hoặc modify code
- `hotfix/branch-name`: Thường đặt khi fix 1 bugs mà đang trên môi trường products

### 4.2. Đặt tên commit

- Đặt tên commit có ý nghĩa, k đặt những commit với nội dung vô nghĩa hoặc k rõ ràng như `fix`, `test`, `update`,...
- Thay vào đó: `fix action move to home page`, `update title content of question 6`,...

### 4.3. Số lượng commit

- Thường thì một branch được tạo ra với 1 mục đích nhất định nào đó, nên 1 branch có chỉ 1 commit là lý tưởng nhất, nếu có nhiều hơn 1 thì các commit phải phần code thay đổi phải tương ứng với nhau.

- Hạn chế việc có quá nhiều commit trong 1 branch, điều này sẽ khiến việc merge code hoặc trace sẽ khó khăn hơn rất nhiều.

> Tối đã 1 branch nên tạo 3 commit
