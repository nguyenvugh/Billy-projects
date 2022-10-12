import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedingConfigOxfamPage1648730332793 implements MigrationInterface {
  content = JSON.stringify({
    content:
      '<div class="css-obc5ee"><div class="css-wo9x7w"><p class="chakra-text css-0">Mặc dù có khung pháp lý vững chắc về bình đẳng giới, nhưng phụ nữ ở Việt Nam vẫn tiếp tục bị phân biệt đối xử và thường thiếu các cơ hội kinh tế và chính trị. Bạo lực trên cơ sở giới vẫn còn phổ biến; khoảng 58% phụ nữ đã từng kết hôn ở độ tuổi 18-60 phải trải qua một số hình thức bạo lực dưới bàn tay của chồng hoặc bạn tình ít nhất một lần trong đời.</p><p class="chakra-text css-0">Để giải quyết những vấn đề này, chúng tôi mong muốn nắm lấy sự đa dạng và tác động đến chính sách để đảm bảo sự tham gia đầy đủ của phụ nữ và cơ hội bình đẳng cho vai trò lãnh đạo ở tất cả các cấp ra quyết định trong đời sống chính trị, kinh tế và công cộng. Chúng tôi nỗ lực vì tăng trưởng đồng đều và quyền bình đẳng đối với các nguồn lực kinh tế, cũng như quyền tiếp cận quyền sở hữu và kiểm soát đất đai và các dạng tài sản khác, dịch vụ tài chính, thừa kế và tài nguyên thiên nhiên. Bằng cách thách thức và thay đổi các chuẩn mực xã hội, chúng ta đấu tranh để chấm dứt bạo lực trên cơ sở giới.</p></div><img src="/img/introduce/img-step1.png" class="chakra-image css-0"></div>',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO config_oxfam(key, name, updated_at, created_at, version, type, value)
      VALUES ('PAGE_HOME', 'Cấu hình trang chủ', NOW(), NOW(), 1, 'PAGE', '${this.content}'),
      
      ('PAGE_INTRO', 'Cấu hình trang giới thiệu', NOW(), NOW(), 1, 'PAGE', '${this.content}'),
      
      ('PAGE_POLICIES', 'Cấu hình trang chính sách', NOW(), NOW(), 1, 'PAGE', '${this.content}'),
      
      ('PAGE_CONDITIONS', 'Cấu hình trang điều kiện', NOW(), NOW(), 1, 'PAGE', '${this.content}');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM config_oxfam WHERE key = 'PAGE_HOME' OR key = 'PAGE_INTRO' OR key = 'PAGE_POLICIES' OR key = 'PAGE_CONDITIONS';`,
    );
  }
}
