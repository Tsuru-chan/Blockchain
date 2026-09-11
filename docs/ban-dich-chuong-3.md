# BẢN DỊCH CHƯƠNG 3: KHẢ NĂNG XỬ LÝ GIAO DỊCH (TRANSACTIONAL CAPACITY)

Trong chương này, chúng ta sẽ xem xét mạng lưới Bitcoin, phân biệt các loại thành viên tham gia mạng lưới khác nhau và trình bày cách thức các thông điệp được trao đổi nhằm đạt được sự đồng thuận. Chúng ta cũng sẽ xem xét giao thức truyền thông Bitcoin và phân tích các loại thông điệp khác nhau. [15]

## 3.1 Mạng lưới Bitcoin (Bitcoin Network)
Mạng lưới Bitcoin là xương sống của hệ thống Bitcoin. Nó kết nối các nút mạng cá nhân và cho phép họ chuyển tiếp các giao dịch cũng như các khối. Do đó, mạng lưới này đóng vai trò quyết định đối với khả năng xử lý giao dịch của hệ thống.

### 3.1.1 Kiến trúc phi tập trung (Decentralized Architecture)
Bitcoin là một mạng lưới ngang hàng (peer-to-peer) (Hình 3.1a). Trái ngược với các mạng lưới tập trung (Hình 3.1b), trong mạng lưới Bitcoin không có thành viên nào nắm giữ vai trò đặc quyền [15]. Các thành viên tham gia thường có số lượng kết nối lớn và các kết nối mới có thể được thiết lập giữa bất kỳ hai thành viên nào. Mỗi thành viên có thể lưu trữ một bản sao cục bộ của chuỗi khối (blockchain) Bitcoin, tự mình xác thực tính hợp lệ của các giao dịch và gửi chúng cho các thành viên khác trong mạng lưới. Điều này cho phép hoạt động truyền thông và lưu trữ dữ liệu diễn ra mà không cần đến một bên trung tâm [15].

Kiến trúc phi tập trung giúp mạng lưới ngang hàng có khả năng phục hồi và chống chịu đặc biệt tốt trước các cuộc tấn công và sự cố kỹ thuật. Trong một mạng lưới tập trung, sự cố tại nút trung tâm có thể dẫn đến hậu quả nghiêm trọng, thậm chí làm mất mát dữ liệu hoặc làm tê liệt hoàn toàn hoạt động truyền thông. Ngược lại, trong mạng lưới ngang hàng, mọi thành viên đều có thể được thay thế [15]. Các sự cố kỹ thuật thường được xử lý dễ dàng bởi các nút mạng khác, dữ liệu bị mất cục bộ sẽ được khôi phục, và hoạt động truyền thông được duy trì qua các đường kết nối thay thế. Về khía cạnh này, hệ thống phi tập trung không phụ thuộc vào bất kỳ nút mạng riêng lẻ nào. Cấu trúc của chúng ngăn chặn việc một nút đơn lẻ chiếm vị trí trọng yếu mang tính hệ thống, từ đó giúp mạng lưới trở nên mạnh mẽ hơn [15].

Từ góc độ quản lý pháp lý, tính phi tập trung cũng mang lại cho mạng lưới một khả năng "miễn dịch" nhất định. Việc quản lý toàn bộ mạng lưới là rất khó khăn do không có các điểm liên lạc trung tâm. Bất cứ khi nào một nút mạng bị đóng cửa, người ta có thể dễ dàng tạo ra một nút mới thay thế [15].

Hơn nữa, nhu cầu quản lý pháp lý không quá cấp bách trong hệ thống phi tập trung. Các mạng lưới tập trung dựa trên sự tin tưởng của người tham gia vào một cơ quan trung ương. Lòng tin này có thể bị lạm dụng thông qua việc thao túng dữ liệu lưu trữ tập trung (nhằm phục vụ lợi ích của chính cơ quan đó hoặc của một khách hàng cụ thể). Trong các hệ sinh thái hiện nay, người ta giả định rằng sự kết hợp của hiệu ứng danh tiếng, cơ chế kiểm soát và các chế tài xử phạt sẽ tạo ra động lực phù hợp để khuyến khích các cơ quan trung ương hợp tác lâu dài. Do đó, việc quản lý pháp lý đối với các hệ thống tập trung là không thể thiếu [15].

Trong mạng lưới phi tập trung, hiệu ứng danh tiếng hầu như không tồn tại do cấu trúc mạng luôn biến động động và tính ẩn danh (hoặc giả danh) của những người tham gia. Các thành viên chỉ tuân thủ giao thức đồng thuận nếu điều đó mang lại lợi ích cho chính họ. Hệ quả là, mỗi thành viên luôn phải giả định rằng các nút ngang hàng (peers) của mình có thể đang chuyển tiếp thông tin sai lệch [15]. Ở Chương 4, chúng ta sẽ xem xét các phương pháp cho phép thành viên mạng lưới xác thực tính chính xác của các thông điệp giao dịch mà họ nhận được.

---
*(Chú thích 2: Sự tồn tại của các nền tảng chia sẻ tệp bất hợp pháp dựa trên mạng ngang hàng là minh chứng rõ nét cho sự bất lực của các nhà quản lý trong việc đối phó với mạng lưới phi tập trung. Mặc dù các trang web torrent lớn thường xuyên bị đóng cửa, các mạng lưới này vẫn tiếp tục tồn tại).*
---

### 3.1.2 Các nút mạng và chức năng (Network Nodes and Functionality)
Trong Phần I của cuốn sách này, chúng ta đã sử dụng thuật ngữ *thành viên tham gia mạng lưới (network participant)* như một khái niệm chung mà không phân biệt các chức năng khác nhau của họ. Cụ thể, có ba chức năng cơ bản: *chức năng xác thực (verification function)*, *chức năng ví (wallet function)*, và *chức năng đào (mining function)* [15]. Từ đây trở đi, chúng ta sẽ sử dụng thuật ngữ **nút mạng (network node)** để chỉ một thành viên thực hiện ít nhất một trong ba chức năng này.

*   **Chức năng xác thực (Verification function):** Chức năng này bao gồm toàn bộ các hoạt động cần thiết để thành viên tự mình tham gia vào mạng lưới và xác thực tất cả các giao dịch một cách độc lập [15]. Cụ thể, các nút mạng tiến hành kiểm tra các thông điệp giao dịch, lưu trữ chúng cục bộ và chuyển tiếp cho các nút khác. Chức năng xác thực yêu cầu nút mạng phải duy trì một bản sao của chuỗi khối Bitcoin và xác thực tính hợp lệ của toàn bộ các khối trong chuỗi khối đó. Chức năng này cũng tạo điều kiện cho việc trao đổi các khối. Các nút mạng thực hiện chức năng xác thực này được gọi là **nút đầy đủ (full nodes)** [15].
*   **Chức năng ví (Wallet function):** Ví cung cấp nơi lưu trữ an toàn cho các khóa riêng tư (private keys), đồng thời theo dõi và quản lý số dư Bitcoin cá nhân của nút mạng [15]. Ví thường được thiết kế cho người dùng cuối và cung cấp giao diện đồ họa trực quan (GUI) giúp việc gửi và nhận các đơn vị Bitcoin trở nên dễ dàng. Ngoài ra, nhiều loại ví còn cung cấp các cơ chế bảo mật tùy chọn nhằm tăng cường bảo vệ các khóa riêng tư.
*   **Chức năng đào (Mining function):** Các nút mạng thực hiện chức năng đào sẽ tích cực tham gia vào việc tạo ra các khối mới và đóng góp vào việc mở rộng chuỗi khối Bitcoin [15].

Một nút mạng mới được tạo ra khi người dùng cài đặt một ứng dụng khách (Bitcoin client) trên máy tính của họ và bắt đầu trao đổi dữ liệu với các nút mạng khác. Hầu hết các ứng dụng khách đều là mã nguồn mở và người dùng được tự do lựa chọn trong số nhiều gói phần mềm có sẵn [15]. Về mặt lý thuyết, người dùng cũng có thể tự phát triển ứng dụng khách của riêng mình và cho phép nó giao tiếp với mạng lưới. Miễn là phần mềm đó tuân thủ đúng giao thức truyền thông của Bitcoin, nó có thể được sử dụng để thiết lập các nút mạng mới và trao đổi thông tin.

Ứng dụng khách phổ biến nhất được gọi là **Bitcoin Core**. Phần mềm này tích hợp đầy đủ cả ba chức năng: thiết lập một nút đầy đủ (full node) và có thể được điều khiển thông qua giao diện đồ họa hoặc dòng lệnh (CLI). Bitcoin Core giữ một bản sao chuỗi khối Bitcoin cục bộ trên máy tính của người dùng [15]. Nó tự động xác thực và chuyển tiếp các giao dịch và các khối mới nhận được. Ngoài ra, Bitcoin Core còn chứa một ví và một ứng dụng đào đơn giản [15].

### 3.1.3 Thiết lập kết nối và cấu trúc liên kết (Connection Setup and Topology)
Sau khi cài đặt thành công ứng dụng khách, phần mềm sẽ tự động kết nối với các nút mạng khác. Kết nối được thiết lập thông qua các giao thức mạng phổ thông (TCP/IP), mặc định qua cổng **8333** [15]. Nút mạng muốn thiết lập kết nối sẽ gửi một thông điệp ban đầu gọi là **version message** đến một địa chỉ IP đã biết của một nút khác. Thông điệp này chứa thông tin về chính nút đó và bản sao chuỗi khối cục bộ của nó, giúp kết nối được thiết lập. Tùy chọn, danh sách địa chỉ IP của nút ngang hàng mới có thể được truy vấn thông qua thông điệp **getaddr** để mở rộng mạng lưới liên kết [15].

Quá trình này diễn ra như sau: Nút mạng (ví dụ: Tamara) tải xuống và cài đặt Bitcoin Core. Sau khi cài đặt thành công, ứng dụng khách sẽ tham khảo danh sách IP đi kèm phần mềm và thiết lập kết nối với một trong các nút đang hoạt động (ví dụ: Edith). Để làm điều này, ứng dụng khách gửi đi một thông điệp **version**, nút nhận (Edith) sẽ phản hồi lại bằng một thông điệp **verack (version acknowledged)** để xác nhận kết nối [15]. Quá trình hiển thị trong Hình 3.2 được thực hiện tự động bởi phần mềm, người dùng không cần phải can thiệp thủ công.

Sau khi Edith chấp nhận kết nối bằng cách gửi lại thông điệp `version` và nhận được xác nhận `verack` từ Tamara, Tamara có thể yêu cầu danh sách địa chỉ IP của Edith bằng thông điệp `getaddr` [15]. Edith sẽ chọn ngẫu nhiên một số địa chỉ IP từ kho lưu trữ địa chỉ khổng lồ của mình để gửi cho Tamara thông qua nhiều thông điệp `addr`. Quy trình lựa chọn ngẫu nhiên này được gọi là **bootstrapping (khởi động tự phát)** [15].

Trong nhiều trường hợp, Edith gửi các địa chỉ IP có sẵn trong kho của mình mà cô ấy hiện không trực tiếp kết nối. Điều này giúp cấu trúc liên kết mạng trở nên mạnh mẽ và phi tập trung hơn [15]. Trong ví dụ ở Hình 3.3, Tamara nhận được địa chỉ IP của Michèle và Jake. Cô có thể sử dụng các địa chỉ IP mới này để tiếp tục gửi các thông điệp `version` và thiết lập thêm các kết nối mới, dẫn đến cấu trúc liên kết mạng lưới như Hình 3.4.

Mặc dù ví dụ này đã được đơn giản hóa (với số lượng nút nhỏ và ít kết nối), nhưng trong mạng lưới Bitcoin thực tế, cơ chế `bootstrapping` tạo ra các đường kết nối gần như ngẫu nhiên, tạo nên một cấu trúc liên kết mạng vô cùng phức tạp và ngẫu nhiên [15]. Khoảng cách địa lý không đóng vai trò gì trong việc lựa chọn các kết nối này. 

Sự phân bổ địa lý của các nút mạng chủ yếu được quan tâm vì lý do địa chính trị hoặc để bảo vệ mạng lưới trước các thảm họa thiên nhiên [15]. Một nghiên cứu năm 2014 về phân bổ địa lý của các nút Bitcoin chỉ ra rằng khoảng **40%** tổng số nút đầy đủ nằm ở **Trung Quốc và Hoa Kỳ** [15]. Phần còn lại được phân bổ tương đối đồng đều trên khắp các khu vực thịnh vượng và đông dân cư khác trên thế giới.

Mạng lưới Bitcoin càng có nhiều nút đầy đủ (full nodes) thì tính an toàn và khả năng chống chịu trước các cuộc tấn công càng cao. Vào cuối năm 2015, mạng lưới có khoảng 5,500 nút đầy đủ, giảm đáng kể so với con số gần 15,000 nút vào năm 2013 [15]. Đến cuối năm 2019, số lượng nút đầy đủ đã phục hồi lên khoảng **9,500 nút** [15].

Các nút đầy đủ đóng vai trò không thể thay thế đối với sự vận hành an toàn của hệ thống Bitcoin, do đó việc sụt giảm số lượng nút này là một vấn đề đáng lo ngại. Sự sụt giảm này chủ yếu do hai nguyên nhân:
1.  **Chi phí vận hành cao:** Vận hành một nút đầy đủ tốn kém tiền bạc (băng thông internet, điện năng, dung lượng lưu trữ ổ cứng lớn) nhưng người vận hành hoàn toàn không nhận được bất kỳ phần thưởng tài chính trực tiếp nào từ hệ thống (xem Hộp 3.1) [15].
2.  **Sự phổ biến của các giải pháp thay thế:** Người dùng có thể thực hiện giao dịch và sở hữu Bitcoin mà không cần phải tự mình vận hành một nút đầy đủ [15].

Về mặt kinh tế học, việc duy trì nút đầy đủ mang tính chất của một **hàng hóa công cộng (common good)** (gây tốn kém chi phí cá nhân nhưng mang lại lợi ích cho toàn bộ cộng đồng mà không thể loại trừ bất kỳ ai khỏi lợi ích đó). Do đó, sự suy giảm số lượng nút đầy đủ không phải là điều đáng ngạc nhiên theo lý thuyết kinh tế [15].

---
### Hộp 3.1: Bitnodes và các chương trình khuyến khích khác
Trong cộng đồng Bitcoin, người ta thường cho rằng động lực để vận hành nút đầy đủ đến từ sự hỗ trợ lẫn nhau mang tính lý tưởng của các thành viên. Thực tế, nhiều người vận hành nút đầy đủ xuất phát từ tinh thần cống hiến hoặc niềm đam mê thuần túy đối với công nghệ [15]. Tuy nhiên, một nền tảng dựa trên chủ nghĩa lý tưởng như vậy là không đủ đối với một hệ thống vốn được thiết kế dựa trên các động lực khuyến khích kinh tế. Để đảm bảo sự tồn tại lâu dài và khả năng mở rộng của Bitcoin, việc ngăn chặn và đảo ngược xu hướng sụt giảm số lượng nút đầy đủ là tối quan trọng [15].

Một số chương trình khuyến khích nút đầy đủ đã được khởi xướng bởi các tổ chức tư nhân. Dự án này chi trả thù lao cho những người vận hành nút đầy đủ đáp ứng được các tiêu chuẩn khắt khe về thời gian trực tuyến (availability) và độ tin cậy (reliability) [15]. Các khoản thanh toán này được tài trợ bởi tài sản cá nhân của người sáng lập chương trình và các khoản quyên góp. Tuy nhiên, dự án này chỉ có thời hạn giới hạn đến cuối năm 2015 và đáng tiếc là không đạt được kết quả như kỳ vọng lâu dài [15].

Một cách tiếp cận bền vững hơn nhiều sẽ là thiết lập một **phần thưởng hệ thống (systemic reward)** cho các dịch vụ như chuyển tiếp giao dịch hoặc cung cấp thông tin cho các ứng dụng khách xác thực thanh toán đơn giản hóa (SPV) (xem mục 3.2.2) [15]. Các giao dịch vi mô (microtransactions) có thể là giải pháp kỹ thuật khả thi để hiện thực hóa cơ chế thưởng này.

---

## 3.2 Mạng lưới mở rộng (Extended Network)
Số lượng nút đầy đủ hoàn toàn không phản ánh đúng số lượng người dùng thực tế của Bitcoin. Sự gia tăng kích thước của chuỗi khối Bitcoin và số lượng giao dịch khổng lồ đã dẫn đến các yêu cầu ngày càng khắt khe về phần cứng và thông số đường truyền internet đối với một nút đầy đủ [15]. Đây là lý do tại sao nhiều người dùng quyết định không tự mình vận hành nút đầy đủ mà thay vào đó lựa chọn tin cậy vào các nút đầy đủ của người khác [15].

Việc ủy quyền xác thực (outsourced validation) mang lại lợi ích là người dùng không cần phải tải xuống và liên tục cập nhật toàn bộ chuỗi khối Bitcoin [15]. Sự tiết kiệm tài nguyên này đặc biệt có ý nghĩa đối với các thiết bị di động (như điện thoại thông minh, máy tính bảng) vốn có dung lượng lưu trữ hạn chế và băng thông mạng giới hạn. Sự tham gia mạng lưới một cách hạn chế này tạo điều kiện thuận lợi cho việc tích hợp những người dùng phổ thông, những người mà nếu không có giải pháp này thì không thể tham gia vào mạng lưới Bitcoin [15].

Tuy nhiên, việc từ bỏ chức năng xác thực độc lập này lại đồng thời tạo ra **sự lệ thuộc**. Hệ thống Bitcoin mang lại cho mỗi người tham gia khả năng tự xác thực tính hợp lệ của tất cả các giao dịch một cách độc lập [15]. Nếu một người tham gia từ bỏ quyền này, họ tự đánh mất đi một phần tính độc lập của mình và buộc phải đặt một mức độ tin tưởng nhất định vào các nguồn cung cấp thông tin của họ [15].

Sự phụ thuộc và mức độ tin cậy này rất khác nhau tùy thuộc vào phương thức kết nối. Sự tham gia gián tiếp vào mạng lưới có thể thông qua hai hình thức chính: **mạng con tập trung (centralized subnetworks)** hoặc **xác thực thanh toán đơn giản hóa (simplified payment verification - SPV)** [15].

### 3.2.1 Mạng con tập trung (Centralized Subnetworks)
Mạng con tập trung thể hiện mức độ lệ thuộc cao nhất. Những người tham gia chỉ kết nối gián tiếp với mạng lưới Bitcoin và phụ thuộc hoàn toàn vào kênh thông tin và truyền thông của một nút đầy đủ cụ thể (Hình 3.5) [15].

Các ứng dụng khách kết nối với mạng con tập trung có thể thực hiện chức năng ví mà không cần truy cập trực tiếp vào mạng lưới Bitcoin. Nút trung tâm đóng vai trò như một máy chủ ủy quyền (proxy server), được ứng dụng khách tham vấn định kỳ để kiểm tra số dư Bitcoin của các địa chỉ của người dùng. Ngoài ra, các thông điệp giao dịch cũng được gửi đến nút trung tâm này để nhờ nó chuyển tiếp gián tiếp vào mạng lưới Bitcoin [15].

Kết nối này vô cùng tiện lợi vì người dùng chỉ cần cài đặt một ví siêu nhẹ (light client) hoặc quản lý số dư thông qua một ứng dụng web [15]. Sự lệ thuộc này hầu như không thể nhận thấy trong các hoạt động giao dịch thông thường. Tuy nhiên, nút trung tâm hoàn toàn có khả năng che giấu thông tin hoặc từ chối chuyển tiếp các giao dịch của người dùng vào mạng lưới (chặn giao dịch) [15]. Điều này có thể do nút trung tâm cố tình gian lận hoặc do các sự cố kỹ thuật của chính nó. Về khía cạnh này, mạng con tập trung làm mất đi phần lớn các thuộc tính mạnh mẽ của mạng lưới ngang hàng và tạo ra các điểm yếu trung tâm dễ bị tấn công cho hệ thống [15].

Trong nhiều trường hợp, các mạng con tập trung này đi kèm với **dịch vụ lưu ký (custody services)** [15]. Trong mối quan hệ này, người dùng chuyển giao hoàn toàn quyền kiểm soát các khóa riêng tư cho nút trung tâm. Người dùng không trực tiếp nắm giữ khóa riêng tư cho số dư của mình mà chỉ sở hữu một tài khoản trên nền tảng của nhà cung cấp dịch vụ [15]. Giao dịch Bitcoin thực tế sẽ do nút trung tâm khởi tạo. Trong mối quan hệ này, người dùng thực chất chỉ nắm giữ một **giấy nhận nợ (IOU)** hứa hẹn sẽ hoàn trả các đơn vị Bitcoin khi có yêu cầu. Điều này hoàn toàn tương tự như tiền tín dụng (credit money), nơi giá trị của lời hứa phụ thuộc vào uy tín tín dụng của tổ chức phát hành [15].

---
### Hộp 3.2: Kết nối với một ứng dụng sử dụng nút đầy đủ riêng
Trong các mạng con tập trung, một nút hạn chế phải hoàn toàn tin tưởng vào nút trung tâm. Vấn đề này có thể được giải quyết nếu người dùng vận hành song song một nút đầy đủ của riêng mình [15].

Ví dụ, một thiết bị di động chạy nút hạn chế có thể truy cập vào một nút đầy đủ chạy trên máy tính để bàn của chính người dùng đó. Bằng cách này, người dùng vừa tận dụng được ưu điểm tải xử lý nhẹ của thiết bị di động, vừa đảm bảo khả năng xác thực hoàn toàn độc lập và an toàn [15]. Một số ứng dụng ví di động hiện nay đã tích hợp sẵn tính năng này.

---

### 3.2.2 Nút xác thực thanh toán đơn giản hóa (SPV)
Các nút xác thực thanh toán đơn giản hóa (SPV clients) cho phép người dùng sử dụng chức năng ví mà không cần phải lưu trữ toàn bộ bản sao chuỗi khối Bitcoin cục bộ [15]. Khác với các nút gián tiếp phụ thuộc vào một máy chủ trung tâm, các nút SPV có kết nối trực tiếp với mạng lưới Bitcoin. Dữ liệu cần thiết được chúng thu thập từ nhiều nút khác nhau trong mạng lưới và có khả năng xác thực một phần [15]. Sự đa dạng của các nguồn dữ liệu cùng với khả năng tự xác thực một phần mang lại cho các nút SPV mức độ bảo mật và tính độc lập cao hơn nhiều so với việc kết nối với một mạng con tập trung [15].

Một nút SPV chỉ lưu trữ một phần rất nhỏ của các khối – được gọi là **tiêu đề khối (block header)** [15]. Tiêu đề khối chứa số nhận dạng (hash value) của khối, phụ thuộc vào các giao dịch nằm trong khối đó nhưng bản thân nó không chứa các giao dịch cụ thể. Nhờ vậy, các nút SPV chỉ yêu cầu dung lượng lưu trữ bằng khoảng **1/1000** so với nút đầy đủ [15]. Một nút SPV chỉ cần lưu trữ đúng **80 bytes** cho mỗi khối. Quan trọng hơn, dung lượng này không thay đổi bất kể số lượng giao dịch chứa trong khối là bao nhiêu, giúp tốc độ tăng trưởng dung lượng lưu trữ của nút SPV là tuyến tính ngay cả khi số lượng người dùng và giao dịch tăng đột biến [15].

Để kiểm tra xem một giao dịch có hợp lệ hay không (tức là đầu ra giao dịch chưa chi tiêu - UTXO được tham chiếu trong giao dịch đó chưa từng được sử dụng trước đây), các nút đầy đủ sẽ quét toàn bộ dữ liệu chuỗi khối cục bộ của chúng [15]. Các nút SPV không thể làm điều này, thay vào đó chúng sử dụng một phép suy nghiệm (heuristic) dựa trên **độ sâu của khối (block depth)** – tức là số lượng xác nhận (confirmations) đã bảo mật cho giao dịch đó [15]. Nếu khối chứa giao dịch đó được tiếp nối bởi một số lượng khối nhất định (thường là 6 khối), các nút SPV sẽ coi giao dịch đó là hợp lệ [15]. Do việc tạo ra các khối tiếp theo đòi hỏi tài nguyên tính toán cực kỳ lớn và dữ liệu được nút SPV thu thập từ nhiều nguồn độc lập, xác suất xảy ra nỗ lực thao túng thông tin là cực kỳ thấp [15].

Tuy nhiên, các nút SPV vẫn phải đối mặt với hai vấn đề lớn:
1.  **Vấn đề che giấu thông tin:** Các nút SPV có thể xác thực xem một giao dịch nhận được có thực sự nằm trong một khối hay không; tuy nhiên, chúng không thể biết liệu mình có đang bị các nút khác cố tình che giấu thông tin hay không, hoặc liệu có tồn tại một giao dịch cạnh tranh (giao dịch chi tiêu kép) nào khác hay không [15].
2.  **Vấn đề quyền riêng tư:** Để truy vấn dữ liệu, nút SPV phải gửi yêu cầu thông tin về các giao dịch liên quan đến các khóa công khai (hoặc địa chỉ Bitcoin) của chính nó. Điều này cho phép các nút khác liên kết các địa chỉ giả danh này với địa chỉ IP của người dùng và xây dựng một hồ sơ người dùng chi tiết [15]. Để đối phó, nút SPV có thể yêu cầu một lượng lớn dữ liệu ngẫu nhiên không liên quan, nhưng lượng dữ liệu khổng lồ này lại phá vỡ mục đích tiết kiệm tài nguyên ban đầu của nút SPV [15].

Để giải quyết vấn đề riêng tư thứ hai, các giao dịch thường được truy vấn thông qua các **bộ lọc Bloom (bloom filters)** [15]. Bộ lọc Bloom chỉ rõ một yêu cầu tìm kiếm bằng cách sử dụng các hàm băm (hash functions) (xem Chương 4). Nút SPV gửi một yêu cầu tìm kiếm các giao dịch khớp với một mẫu tìm kiếm cụ thể sau khi đã áp dụng các hàm băm khác nhau, độ chính xác có thể được điều chỉnh linh hoạt tùy thuộc vào nhu cầu bảo mật [15]. Cơ chế này được định nghĩa chi tiết trong đề xuất cải tiến **BIP0037** dành cho hệ thống Bitcoin [15].

### 3.2.3 Khai thác theo nhóm (Pool Mining)
Hoạt động khai thác Bitcoin (đào coin) hiện nay thường được thực hiện chung bởi các nhóm thợ đào lớn, được gọi là **mỏ khai thác (mining pools)** [15]. Khai thác đơn lẻ (solo mining) bắt buộc thợ đào phải vận hành một nút đầy đủ của riêng mình. Ngược lại, khai thác theo nhóm (pool mining) thì không cần [15].

Thông thường, chỉ có người vận hành mỏ khai thác (pool operator) nắm giữ bản sao chuỗi khối Bitcoin và chịu trách nhiệm điều phối, phân phối công việc cho các thành viên trong mỏ (tương tự như cấu trúc của một mạng con tập trung) [15]. Do đó, pool mining là một nguyên nhân lớn góp phần vào sự sụt giảm số lượng nút đầy đủ và dấy lên những lo ngại sâu sắc về xu hướng tập trung hóa quyền lực trong hệ thống Bitcoin [15].

## 3.3 Giao thức truyền thông Bitcoin (Bitcoin Communication Protocol)
Mục đích của mạng lưới Bitcoin là cho phép trao đổi thông tin một cách thông suốt. Để thông tin này có thể được xử lý đồng bộ bởi các ứng dụng khách khác nhau, hoạt động truyền thông phải tuân theo một định dạng chuẩn hóa [15]. Không một ứng dụng khách nào có thể bị ép buộc tuân thủ các tiêu chuẩn này. Giao thức truyền thông chỉ đơn thuần mô tả cách định dạng thông tin. Nếu một nút mạng muốn giao tiếp thành công với các nút khác, việc tuân thủ định dạng này là hoàn toàn vì lợi ích của chính nó [15].

Đối với mạng lưới Bitcoin, việc trao đổi các khối (blocks) và giao dịch (transactions) là quan trọng nhất. Các thông điệp không trực tiếp phục vụ cho việc trao đổi hai loại thông tin này chỉ đóng vai trò thứ yếu [15].

### 3.3.1 Trao đổi khối (The Exchange of Blocks)
Khi phần mềm khách được khởi động lần đầu tiên, nó sẽ dành vài giờ đến vài ngày để tải xuống, xác thực và lập chỉ mục cho toàn bộ các khối trong chuỗi khối Bitcoin [15]. Khối đầu tiên, **khối khởi nguồn (genesis block)**, được tích hợp sẵn vào phần mềm khi cài đặt. Tất cả các khối tiếp theo phải được lấy từ các nút khác và được xác thực độc lập bởi phần mềm cục bộ. Kích thước dữ liệu chuỗi khối Bitcoin vào khoảng **205 gigabytes (GB)** vào cuối năm 2019 (Hình 5.1) [15].

Để tải dữ liệu này một cách hiệu quả, hai nút mạng trước hết phải xác định xem họ cần trao đổi những khối nào. Tuy nhiên, nếu một trong hai nút nhận được thông điệp **getblocks** chứa một số nhận dạng khối không khớp với khối cuối cùng trong chuỗi khối cục bộ của nó, nó sẽ tìm kiếm khối đó trong chuỗi của mình và gửi đi thông điệp **inv (inventory - danh mục)** chứa các số nhận dạng của các khối tiếp theo khối đó (một thông điệp `inv` chứa tối đa 500 số nhận dạng khối) [15].

Nút nhận được thông điệp `inv` sau đó sẽ yêu cầu các khối cụ thể bằng cách sử dụng thông điệp **getdata**. Hình 3.6 minh họa lịch sử trao đổi thông điệp giữa hai nút khi truyền tải dữ liệu khối [15]. Nguyên tắc này giúp ngăn chặn việc một nút phải nhận các khối dữ liệu mà nó đã có sẵn. Mỗi nút có thể độc lập quyết định loại dữ liệu nào nó muốn yêu cầu từ nút ngang hàng nào [15].

Khi một nút nhận được một khối, nó sẽ độc lập kiểm tra tính hợp lệ của tất cả các giao dịch chứa trong khối đó, đảm bảo rằng các giao dịch chỉ tham chiếu đến các đầu ra giao dịch chưa chi tiêu (UTXO) hợp lệ và được khởi tạo bởi chính chủ sở hữu hợp pháp (xem mục 4.4.1) [15]. Nút mạng cũng kiểm tra liên kết tham chiếu đến khối cũ và kiểm tra xem số nhận dạng của khối hiện tại có đáp ứng tiêu chuẩn về ngưỡng độ khó (difficulty threshold) hay không [15]. Nhờ vậy, mỗi nút có thể xác định rõ ràng liệu một khối có đáp ứng đầy đủ các điều kiện đồng thuận hay không. Chỉ khi và chỉ khi tất cả các bước kiểm tra đều vượt qua, nút mạng mới tích hợp khối đó vào chuỗi khối cục bộ của mình [15].

### 3.3.2 Trao đổi giao dịch (The Exchange of Transactions)
Việc truyền tải dữ liệu giao dịch thực tế được thực hiện bằng thông điệp **tx message**. Hình 3.7 minh họa quy trình trao đổi thông điệp giao dịch giữa hai nút [15].

Nếu một nút mạng nhận được một thông điệp `tx` được yêu cầu, trước hết nó sẽ kiểm tra kỹ lưỡng giao dịch đó và chỉ chuyển tiếp đi nếu quá trình xác thực thành công [15]. Hoạt động xác thực được thực hiện bằng cách kiểm tra các điều kiện mở khóa và các chữ ký kỹ thuật số đi kèm giao dịch (xem chi tiết ở mục 4.5). Nếu xác thực thất bại, giao dịch sẽ bị loại bỏ ngay lập tức. Cơ chế này bảo vệ mạng lưới khỏi các cuộc tấn công từ chối dịch vụ (DoS) – loại tấn công cố gắng làm tê liệt đường truyền bằng cách làm tràn ngập mạng lưới với số lượng lớn các giao dịch không hợp lệ [15].

Ngược lại, nếu xác thực thành công, thông điệp giao dịch sẽ được lưu vào bộ nhớ cục bộ của nút mạng – được gọi là **mempool (hàng đợi giao dịch chưa xác nhận)**, và được giới thiệu tới các nút mạng khác thông qua thông điệp `inv` [15]. Điều này dẫn đến sự lan truyền thông tin theo cấp số nhân trong mạng lưới. Càng có nhiều nút mạng lưu trữ thông điệp này cục bộ, tốc độ phân phối giao dịch trên toàn mạng càng nhanh [15].

---
### Hộp 3.3: Sự tương thích về động cơ khuyến khích liên quan đến lan truyền thông tin
Trong một số điều kiện nhất định, các nút mạng có thể có động cơ không chuyển tiếp các thông điệp giao dịch [15]. Nếu phí giao dịch chiếm một phần đáng kể trong phần thưởng khai thác khối, các thợ đào có thể tăng doanh thu kỳ vọng của chính mình bằng cách giữ bí mật thông tin giao dịch để tự mình khai thác khối đó [15]. Tuy nhiên, vấn đề này có thể dễ dàng được khắc phục bởi người khởi tạo giao dịch bằng cách chủ động gửi giao dịch đó đồng thời đến nhiều thợ đào (mỏ khai thác) độc lập khác nhau [15].

Đối với việc truyền thông các khối, một vấn đề tương tự nhưng nghiêm trọng hơn nhiều có thể xảy ra. Đôi khi, một thợ đào (hoặc mỏ khai thác) có lợi thế khi giữ bí mật một khối hợp lệ vừa tìm được và âm thầm tiếp tục khai thác khối tiếp theo trên khối đó [15]. Mặc dù thợ đào này phải đối mặt với rủi ro bị mất phần thưởng khối nếu một thợ đào khác tìm ra khối cạnh tranh trước và công bố nó, hành vi này lại có thể khiến các đối thủ cạnh tranh lãng phí tài nguyên tính toán để khai thác trên khối cũ đã lỗi thời [15]. Do phần thưởng kỳ vọng tỷ lệ thuận với tổng tài nguyên tính toán của toàn bộ mạng lưới, việc giữ lại khối hợp lệ có thể làm tăng doanh thu kỳ vọng của thợ đào đó. Hiện tượng này được gọi là **khai thác ích kỷ (selfish mining)** [15].

Để giảm thiểu vấn đề này, các nghiên cứu đã chỉ ra rằng hành vi khai thác ích kỷ chỉ thực sự mang lại lợi nhuận kinh tế khi thợ đào (hoặc mỏ khai thác) đó kiểm soát ít nhất **1/3** (khoảng 33%) tổng công suất tính toán (hash rate) của toàn bộ mạng lưới Bitcoin [15].

---

## 3.4 Bài tập thực hành (Exercises)

*   **Bài tập 3.1:** Hãy thảo luận về mức độ đóng góp của kiến trúc phi tập trung đối với độ bền vững và khả năng phục hồi của mạng lưới Bitcoin. [15]
*   **Bài tập 3.2:** Hãy giải thích cách thức một nút mạng mới kết nối với hệ thống và những đặc điểm nào của quá trình thiết lập kết nối đảm bảo rằng một cấu trúc liên kết mạng ngẫu nhiên sẽ được hình thành. [15]
*   **Bài tập 3.3:** Mô tả các chức năng mà một nút mạng cần thực hiện để đạt được trạng thái của một nút đầy đủ (full node). Ngoài ra, hãy chỉ ra mức độ quan trọng của các nút đầy đủ đối với trạng thái an toàn của mạng lưới Bitcoin. [15]
*   **Bài tập 3.4:** Hãy mô tả cách thức vận hành của các nút mạng hạn chế dưới đây, đồng thời chỉ ra các ưu điểm và nhược điểm tiềm ẩn của từng lựa chọn phần mềm: [15]
    *   a) Chức năng ví thông qua một mạng con tập trung.
    *   b) Ví SPV.
*   **Bài tập 3.5:** Hãy mô tả mục đích và vai trò của giao thức truyền thông Bitcoin. [15]
*   **Bài tập 3.6:** Bằng cách sử dụng một ví dụ thực tế, hãy trình bày cách thức các giao dịch và các khối được chuyển tiếp trong mạng lưới. Mô tả quá trình này một cách trực quan, đồng thời gọi tên các thông điệp liên quan và mục đích của chúng. [15]
