# BẢN DỊCH CHƯƠNG 2: TỔNG QUAN VỀ BITCOIN (BITCOIN OVERVIEW)

*Bản dịch đầy đủ và chính xác dựa trên tài liệu nguồn "Bitcoin, Blockchain, and Cryptoassets: A Comprehensive Introduction" (Fabian Schär, Aleksander Berentsen).*

---

Trong chương này, chúng ta bắt đầu phân tích về hệ thống Bitcoin [27]. Chúng ta thảo luận về thuật ngữ này, phân định hệ thống Bitcoin với hệ thống tài chính cổ điển, và làm sáng tỏ những hệ quả của việc không có một cơ quan quản lý trung ương [27]. Chúng ta sẽ chỉ ra cách ba yêu cầu giao dịch được thảo luận ở phần 1.5.3 (Khả năng giao dịch, Tính hợp lệ giao dịch, Sự đồng thuận giao dịch) được đáp ứng như thế nào, qua đó tạo cơ sở cho phần thứ hai mang tính kỹ thuật hơn của cuốn sách này [27]. Sau đó, chúng ta tập trung vào nguồn gốc, sự phát triển, và các đặc điểm chính trị của hệ thống Bitcoin [28]. Chương này đóng vai trò như một bản tóm tắt ngắn gọn và cái nhìn tổng quan ban đầu nhằm làm nổi bật tính chất đổi mới mang tính đột phá của hệ thống Bitcoin [28].

**Bitcoin** là một thuật ngữ có nhiều nghĩa [28]. Nó được sử dụng để mô tả cả hệ thống tổng thể và một số thành phần phụ bên trong [28]. Danh mục thành phần phụ bao gồm mạng lưới Bitcoin (Bitcoin network), giao thức (truyền thông) Bitcoin (Bitcoin protocol), và đơn vị (tiền tệ) Bitcoin (Bitcoin unit) [28]. Sự mơ hồ của thuật ngữ này gây ra rất nhiều sự nhầm lẫn và là trở ngại đầu tiên cần phải vượt qua để hiểu được hệ thống [28]. Do đó, chúng ta sẽ sử dụng một ranh giới định nghĩa nghiêm ngặt giữa các khái niệm khác nhau [29]. Thuật ngữ **"Bitcoin"** khi đứng một mình sẽ được dùng để chỉ **hệ thống Bitcoin** hoặc **công nghệ Bitcoin** [29]. Khi đề cập đến các thành phần phụ, chúng ta sẽ luôn sử dụng rõ ràng các thuật ngữ **mạng lưới (network)**, **giao thức (protocol)**, hoặc **đơn vị (unit)** [29].

---

## 2.1 Phân loại Bitcoin (Classification of Bitcoin)

**Bitcoin** là một khái niệm toàn diện liên kết nhiều thành phần công nghệ lại với nhau theo cách mà các đơn vị giá trị được phát hành dưới hình thức cạnh tranh, có cả đại diện ảo và quy trình xử lý giao dịch phi tập trung [29]. Bằng cách này, hệ thống Bitcoin đã tạo ra một loại tiền tệ khác biệt căn bản so với bất kỳ loại tiền nào khác—chẳng hạn như tiền hàng hóa, tiền mặt, hoặc tiền gửi ngân hàng thương mại (xem Hình 2.1) [30].

Để hiểu tại sao Bitcoin là duy nhất, điều hữu ích là xem xét lại các dạng tiền tệ khác nhau theo cấu trúc kiểm soát của chúng như được hiển thị trong **Hình 2.1** [30]. Có ba khía cạnh cấu thành:

1. **Hình thức đại diện (Representation):** Tiền có thể được đại diện dưới dạng ảo (virtual) hoặc dạng vật lý (physical) [31].
2. **Xử lý giao dịch (Transaction handling):** Tiền có thể được giao dịch trong các mạng lưới tập trung (centralized) hoặc phi tập trung (decentralized) [31].
3. **Tạo tiền (Money creation):** Một số loại tiền được tạo ra bởi một tổ chức độc quyền (monopoly), trong khi những loại khác được phát hành dưới cơ chế cạnh tranh (competitive) [31].

```
                  HÌNH THỨC ĐẠI DIỆN (Representation)
                        /                     \
                VẬT LÝ (Physical)          ẢO (Virtual)
                      /                         \
             XỬ LÝ GIAO DỊCH               XỬ LÝ GIAO DỊCH
           (Transaction handling)         (Transaction handling)
             /            \               /               \
     TẬP TRUNG        PHI TẬP TRUNG    TẬP TRUNG       PHI TẬP TRUNG
   (Centralized)     (Decentralized) (Centralized)    (Decentralized)
         |                  |              |                  |
      [Không]             Tiền      Tiền gửi NH thương mại   **BITCOIN**
                        hàng hóa    Tiền điện tử NHTW     (Cạnh tranh)
                         (Cạnh     (Độc quyền phát hành)
                        tranh)             |
                                      Tiền DigiCash
                                      (Độc quyền phát hành)
```
*Hình 2.1: Ma trận cấu trúc kiểm soát đối với các đơn vị tiền tệ (Tham khảo trực quan).*

Hãy so sánh các loại tiền tệ theo các khía cạnh này:
* **Tiền hàng hóa (Commodity money):** Có hình thức vật lý, xử lý giao dịch phi tập trung (người trao người trực tiếp) và việc tạo tiền mang tính cạnh tranh (bất kỳ ai cũng có thể khai thác vàng hoặc thu thập hàng hóa) [31].
* **Tiền mặt (Cash):** Có hình thức vật lý, xử lý giao dịch phi tập trung, nhưng việc tạo tiền là độc quyền (do Ngân hàng Trung ương phát hành duy nhất) [30, 31].
* **Tiền gửi ngân hàng thương mại (Commercial bank deposits):** Là tiền ảo, tồn tại chỉ dưới dạng ghi chép trong hệ thống sổ sách kế toán [32]. Khi thực hiện thanh toán, tài khoản được điều chỉnh bằng cách khấu trừ tiền của người mua và ghi có cho người bán [32]. Các ngân hàng thương mại cạnh tranh để giành tiền gửi; đó là lý do tại sao chúng ta coi việc tạo tiền gửi ngân hàng thương mại là có tính cạnh tranh [32]. Tuy nhiên, việc xử lý giao dịch lại mang tính tập trung vì nó phụ thuộc vào sổ cái của ngân hàng và các tổ chức thanh toán bù trừ trung ương [20, 32].
* **Tiền điện tử của ngân hàng trung ương (Central bank electronic money / reserves):** Là tiền ảo, được xử lý tập trung và chịu sự kiểm soát độc quyền hoàn toàn của ngân hàng trung ương [33].

Đổi mới cơ bản của **Bitcoin** là **quản lý phi tập trung quyền sở hữu đối với một tài sản ảo** [33]. Đặc điểm đặc biệt của Bitcoin là nó kết hợp các ưu điểm giao dịch của một đơn vị tiền ảo với sự độc lập mang tính hệ thống của quy trình xử lý giao dịch phi tập trung [33]. Đổi mới này có tiềm năng phá vỡ cơ sở hạ tầng tài chính hiện tại và nhiều lĩnh vực khác [33].

---

## 2.2 Các thành phần của Bitcoin: Tổng quan (Bitcoin Components: An Overview)

Để đạt được sự kết hợp độc đáo của các cấu trúc kiểm soát được mô tả trong Hình 2.1, Bitcoin sử dụng một vài thành phần hiển thị trong Hình 2.2 [34]:

* **Đơn vị Bitcoin (Bitcoin unit):** Đây là các đơn vị tiền ảo của hệ thống [34]. Chúng không tồn tại dưới dạng vật lý [34]. Các đơn vị Bitcoin chỉ đơn thuần là các mục ghi chép trong sổ cái được gán cho một cá nhân cụ thể thông qua điều kiện khóa mã hóa (nói chính xác hơn, việc chuyển giao các đơn vị Bitcoin được liên kết với một điều kiện mà chỉ một cá nhân hoặc một nhóm cá nhân cụ thể sở hữu khóa riêng tư tương ứng mới có thể đáp ứng) [34, 35].
* **Mạng lưới Bitcoin (Bitcoin network):** Là một mạng lưới hoàn toàn phi tập trung [34]. Nó bao gồm các máy tính tham gia (nút mạng) và các kết nối giữa chúng, hoạt động như một kênh truyền thông chính để trao đổi thông tin giao dịch và xây dựng sự đồng thuận toàn mạng [34, 35].
* **Giao thức Bitcoin (Bitcoin protocol):** Quy định các quy tắc và phương thức giao tiếp bên trong mạng lưới Bitcoin [35]. Nó chủ yếu chứa các hướng dẫn tiêu chuẩn hóa về cách định dạng các loại thông điệp (chẳng hạn như thông điệp giao dịch và thông điệp khối) [35].
* **Mật mã học bất đối xứng (Asymmetric cryptography):** Được sử dụng cho mục đích xác thực [36]. Nó cho phép tất cả người dùng trong mạng lưới Bitcoin xác minh một cách độc lập và chắc chắn tính hợp lệ của bất kỳ thông điệp giao dịch nào [36].
* **Chuỗi khối Bitcoin (Bitcoin blockchain):** Là một sổ cái công khai (public ledger) [36]. Mọi cá nhân đều có thể kiểm tra sổ cái, tải xuống một bản sao, và thay đổi nó trên máy của mình [37]. Tuy nhiên, mạng lưới sẽ chỉ chấp nhận phiên bản sổ cái nào: (1) chỉ chứa các giao dịch hợp lệ đã được xác minh bằng toán học và (2) được coi là phiên bản mới nhất và dài nhất của chuỗi khối Bitcoin [37]. Tiêu chí thứ hai được đảm bảo bởi một giao thức đồng thuận sử dụng cơ chế **Bằng chứng công việc (Proof of Work)** [37].

---

## 2.3 Đề xuất giá trị độc nhất của Bitcoin (Bitcoin’s Unique Selling Proposition)

Việc sử dụng sổ cái không phải là một phát minh mới của công nghệ Bitcoin [37]. Hệ thống ngân hàng thương mại hiện tại cũng duy trì các sổ cái để theo dõi số dư tài khoản của khách hàng [23]. Tuy nhiên, sự khác biệt lớn nhất nằm ở **quyền kiểm soát và sự tin cậy** [38].

Trong hệ thống tài chính truyền thống, tính hợp lệ của giao dịch được kiểm tra và thực thi bởi một cơ quan trung ương [38]. Ngân hàng xác định danh tính của người khởi tạo giao dịch, kiểm tra xem họ có đủ số dư hay không, và sau đó ghi nhận giao dịch vào sổ cái tập trung [38]. Sự tin tưởng được đặt hoàn toàn vào tổ chức trung gian này [41]. Sổ cái duy nhất của ngân hàng đảm bảo **sự đồng thuận giao dịch** một cách mặc định [39]. 

Nếu không có cơ quan trung ương, việc thực hiện thanh toán theo cách truyền thống là không thể [38]. Trong hệ thống Bitcoin, một phương án khác phải được thiết lập để cho phép người tham gia khởi tạo giao dịch một cách an toàn [38]. Khi từ chối sử dụng cơ quan trung ương, việc đảm bảo khả năng xử lý giao dịch, thiết lập tính hợp lệ của giao dịch và đạt được sự đồng thuận giao dịch trở nên khó khăn hơn rất nhiều [39, 40]. 

Bitcoin giải quyết vấn đề này bằng cách kết hợp mật mã học và lý thuyết trò chơi để tạo ra một hệ thống **không cần lòng tin (trustless)** [41]. Mọi giao dịch và trạng thái của sổ cái đều có thể được xác minh bằng toán học bởi tất cả những người tham gia sử dụng hệ thống [41]. Điều này tạo ra sự khác biệt rõ rệt giữa Bitcoin và các hệ thống tiền tệ phi tập trung trong lịch sử như hệ thống tiền đá của đảo Yap [41].

---

> ### Hộp 2.1: Sự khác biệt so với Hệ thống tiền đá Yap
> 
> Về mặt cấu trúc kiểm soát, hệ thống tiền tệ của đảo Yap (xem Hộp 1.11) thuộc cùng danh mục với Bitcoin [40]. Các đơn vị giá trị (đá Fei) mang tính ảo (vì quyền sở hữu được công nhận bằng lời nói và không cần di chuyển các tảng đá khổng lồ vật lý), chúng được tạo ra dưới sự cạnh tranh (bất kỳ ai cũng có thể chèo thuyền đến đảo đá vôi khác để đục đá mới mang về), và các giao dịch được giải quyết trong một hệ thống phi tập trung dựa trên sự đồng thuận của cộng đồng [40].
> 
> Tuy nhiên, sự khác biệt lớn nhất giữa hai hệ thống là **Bitcoin có thể được sử dụng trong một bối cảnh không đòi hỏi sự tin tưởng lẫn nhau (trustless)** [40, 41]. Hệ thống đảo Yap dựa vào các mối quan hệ xã hội chặt chẽ giữa những người tham gia và mối đe dọa bị loại trừ khỏi cộng đồng nếu có hành vi gian lận [41].
> 
> Bitcoin đảm bảo rằng tất cả các giao dịch và trạng thái của sổ cái có thể được xác minh bằng toán học bởi mọi người tham gia hệ thống [41]. Nó hoạt động hoàn hảo mà không cần các mối quan hệ tin cậy cá nhân [41]. Do đó, nó hoàn toàn khác biệt với hệ thống Yap mặc dù có một vài điểm tương đồng bề ngoài [41].

---

## 2.4 Công nghệ của Bitcoin: Sơ lược (Bitcoin’s Technology: A Primer)

Phần này tóm tắt cách thức Bitcoin đáp ứng ba yêu cầu giao dịch cốt lõi mà không cần cơ quan trung ương [42].

### 2.4.1 Khả năng xử lý giao dịch (Transactional Capacity)
Mạng lưới Bitcoin là nền tảng của hệ thống [42]. Nó được xây dựng trên công nghệ **ngang hàng (peer-to-peer - P2P)** [42]. Ngang hàng có nghĩa là tất cả những người tham gia mạng lưới đều bình đẳng, không có ngoại lệ, và giao tiếp có thể diễn ra trực tiếp giữa hai bên bất kỳ [42]. Không có cấu trúc máy chủ trung tâm và không người tham gia nào có đặc quyền độc quyền [42].

Khi Edith muốn gửi cho Daniel một đơn vị Bitcoin, cô ấy tạo ra một thông điệp giao dịch chứa lệnh thanh toán tương ứng [43]. Thông điệp này phải được cấu trúc theo đúng các tiêu chuẩn của giao thức Bitcoin và gửi đến ít nhất một nút mạng khác [43]. 

Như minh họa trong **Hình 2.3**, thông điệp giao dịch đầu tiên đạt đến Tony, người sẽ lưu giữ một bản sao của thông điệp và chuyển tiếp nó đến các kết nối trực tiếp của anh ta (Marcia và Michèle) [43]. Quá trình này tiếp tục diễn ra cho đến khi thông điệp lan truyền ra toàn bộ mạng lưới [43]. Kiến trúc phi tập trung và động này mang lại cho Bitcoin khả năng phục hồi và chống chịu lỗi xuất sắc [44]. Nếu một vài nút mạng bị ngắt kết nối, mạng lưới vẫn tự động bù đắp và tiếp tục truyền thông tin qua các kênh thay thế [44].

### 2.4.2 Tính hợp lệ của giao dịch (Transactional Legitimacy)
Khi một nút mạng nhận được một thông điệp giao dịch, nó phải đảm bảo giao dịch đó thực sự được khởi tạo bởi chủ sở hữu hợp pháp của số Bitcoin đó [45]. Để làm được điều này, Bitcoin sử dụng mật mã học khóa công khai (asymmetric cryptography) [45].

Quyền sở hữu các đơn vị Bitcoin yêu cầu việc nắm giữ độc quyền một **khóa riêng tư (private key)** [45]. Khóa này được sử dụng để mã hóa hoặc ký kỹ thuật số lên thông điệp giao dịch trước khi nó được gửi đi [45]. Edith ký thông điệp giao dịch bằng khóa riêng tư của mình [46]. Vì Edith là người duy nhất biết khóa riêng tư này, bất kỳ ai trong mạng lưới cũng có thể sử dụng **khóa công khai (public key)** của cô ấy để giải mã và xác minh bằng toán học rằng thông điệp thực sự do cô tạo ra và không bị sửa đổi [46, 47].

Xác minh tại nút mạng đầu tiên là chưa đủ [47]. Vì thông điệp giao dịch được chuyển tiếp qua một mạng lưới không có sự tin cậy lẫn nhau, mọi nút mạng nhận được thông điệp đều phải xác minh độc lập tính hợp lệ của nó [47, 48]. 

Nếu Tony tìm cách thay đổi các thông số giao dịch (ví dụ: đổi người nhận từ Daniel thành chính Tony như trong **Hình 2.5**) và chuyển tiếp thông điệp giả mạo đó đến Marcia và Michèle, họ sẽ ngay lập tức phát hiện ra hành vi gian lận [48]. Vì Tony không có khóa riêng tư của Edith, anh ta không thể tạo ra chữ ký hợp lệ cho thông điệp đã sửa đổi [49]. Marcia và Michèle sử dụng khóa công khai của Edith sẽ thất bại trong việc giải mã/xác thực chữ ký của thông điệp đã sửa đổi đó và sẽ ngay lập tức từ chối giao dịch giả mạo [49].

Nếu thông điệp giao dịch hợp lệ, nó sẽ được đưa vào hàng đợi các giao dịch đã xác minh của các nút mạng (gọi là **mempool**) [49, 50].

### 2.4.3 Sự đồng thuận giao dịch (Transactional Consensus)
Do tính chất phi tập trung của mạng lưới, chắc chắn sẽ có những tình huống mà hàng đợi giao dịch của các nút mạng khác nhau bị lệch pha, hoặc thậm chí chứa các giao dịch mâu thuẫn lẫn nhau [50].

Giả sử Edith cố gắng thực hiện hành vi gian lận bằng cách gửi đồng thời hai giao dịch mâu thuẫn sử dụng cùng một lượng Bitcoin: một giao dịch gửi cho Daniel (gửi cho nhóm của Tony) và một giao dịch gửi cho Lucas (gửi cho nhóm của Jake) [51, 53]. Cả hai giao dịch đều hợp lệ về mặt chữ ký mã hóa của Edith [53]. Trong một hệ thống tập trung, giao dịch nào đến máy chủ trung tâm trước sẽ được chấp nhận [52]. Nhưng Bitcoin không có cơ quan trung ương, do đó một phần của mạng lưới sẽ nghe thấy giao dịch chuyển cho Daniel trước, trong khi phần còn lại nghe thấy giao dịch chuyển cho Lucas trước [52].

Để ngăn chặn việc chi tiêu kép (double-spending) này và đạt được sự đồng thuận duy nhất trên toàn mạng, Bitcoin sử dụng cơ chế khai thác khối (mining) [54].

#### Khai thác Bitcoin (Bitcoin Mining)
**Thợ đào Bitcoin (Bitcoin miner)** thu thập các giao dịch đang chờ xử lý trong mempool, xác minh tính hợp lệ của chúng, và đóng gói chúng thành một cấu trúc dữ liệu gọi là **khối (block)** [55]. Mỗi khối chứa ít nhất một giao dịch [55]. Thợ đào cố gắng liên kết khối mới này vào chuỗi khối hiện tại bằng cách thực hiện các phép tính toán học cực kỳ tốn kém nhằm tìm ra một số nhận dạng khối hợp lệ [55]. Mục tiêu của thợ đào là nhận được phần thưởng bằng các đơn vị Bitcoin mới được tạo ra nếu khối của họ được mạng lưới chấp nhận [55].

Khai thác khối là một quá trình không cần cấp phép (permissionless) nhưng đòi hỏi tài nguyên tính toán lớn [55]. Để một khối được mạng lưới chấp nhận, nó phải đáp ứng một tập hợp các tiêu chí được xác định trước [56]:
1. Tất cả các giao dịch bên trong khối phải hợp lệ và không mâu thuẫn với nhau hoặc mâu thuẫn với bất kỳ giao dịch nào trong quá khứ [56, 57].
2. Khối mới phải tham chiếu đến số nhận dạng (mã băm - hash) của khối ngay trước đó, tạo thành một chuỗi các khối liên tục theo thời gian gọi là **chuỗi khối (blockchain)** [58].
3. Khối phải có số nhận dạng khối (được tính bằng cách băm đầu khối bằng thuật toán SHA256d) nằm dưới một mức ngưỡng (threshold value) mục tiêu nhất định [57, 58].

#### Tính bất biến của chuỗi khối (Immutability of the Blockchain)
Số nhận dạng của mỗi khối là duy nhất và phụ thuộc hoàn toàn vào nội dung của đầu khối (block header) [59]. Bất kỳ thay đổi nhỏ nào đối với nội dung khối (chẳng hạn như sửa đổi số tiền của một giao dịch trong quá khứ) sẽ khiến mã băm đầu khối thay đổi hoàn toàn [59]. Điều này sẽ tạo ra sự không nhất quán trong cấu trúc liên kết chuỗi, buộc kẻ tấn công phải tính toán lại mã băm của khối bị sửa đổi và toàn bộ các khối tiếp theo sau đó [59].

Vì không thể đoán trước đầu vào nào sẽ tạo ra mã băm đầu ra thỏa mãn điều kiện nhỏ hơn ngưỡng mục tiêu, các thợ đào chỉ có một lựa chọn duy nhất là thử hàng triệu triệu trường dữ liệu ngẫu nhiên khác nhau (gọi là **nonce**) cho đến khi tìm được một kết quả hợp lệ nhờ may mắn [61, 62].

#### Sự đồng thuận mạng lưới (Consensus)
Khi một thợ đào tìm thấy một khối hợp lệ, họ sẽ ngay lập tức phát sóng khối đó ra toàn mạng [63]. Các nút mạng khác sẽ dễ dàng kiểm tra tính hợp lệ bằng cách tự băm lại khối đó [63]. Nếu khối đáp ứng đầy đủ quy tắc, họ sẽ cập nhật chuỗi khối của mình và tiếp tục khai thác khối tiếp theo dựa trên khối mới này [64].

Theo quy ước đồng thuận, mạng lưới luôn chấp nhận **chuỗi dài nhất (hoặc chính xác hơn là chuỗi có tổng độ khó tích lũy lớn nhất)** làm trạng thái chính thức của sổ cái [67, 205]. Chuỗi dài nhất đại diện cho chuỗi có nhiều tài nguyên tính toán nhất được đổ vào để bảo vệ, khiến nó cực kỳ tốn kém để có thể thay đổi [67]. Để đảo ngược một giao dịch đã được xác nhận sâu trong chuỗi khối, kẻ tấn công phải sở hữu sức mạnh tính toán lớn hơn tất cả các thợ đào khác cộng lại (được gọi là **cuộc tấn công 51%**) để có thể tạo ra một chuỗi thay thế dài hơn chuỗi hiện tại [68].

Trong ví dụ chi tiêu kép ở Hình 2.6:
* Nhóm thợ đào của Tony sẽ cố gắng đóng gói giao dịch gửi cho Daniel [72].
* Nhóm thợ đào của Jake sẽ cố gắng đóng gói giao dịch gửi cho Lucas [72].
* Giao dịch nào giành chiến thắng sẽ phụ thuộc hoàn toàn vào việc thợ đào thuộc nhóm nào tìm ra khối hợp lệ trước [72]. Giao dịch còn lại sẽ bị loại bỏ và coi như chưa từng tồn tại, giải quyết triệt để vấn đề chi tiêu kép [72, 73].

#### Phần thưởng khai thác khối (Mining Reward)
Hoạt động khai thác khối rất tốn kém (chi phí thiết bị và lượng điện năng khổng lồ) [73]. Để khuyến khích thợ đào đóng đóng góp tài nguyên bảo vệ mạng lưới (cung cấp một hàng hóa công cộng cho toàn bộ người dùng), Bitcoin cho phép thợ đào thêm một giao dịch đặc biệt gọi là **giao dịch coinbase (coinbase transaction)** vào đầu mỗi khối [73, 74].

Giao dịch coinbase cho phép thợ đào tạo ra một lượng Bitcoin mới từ hư vô và chuyển về địa chỉ của họ [74, 75]. Phần thưởng này chỉ có giá trị thực sự nếu khối đó được chấp nhận vào chuỗi khối dài nhất đồng thuận của mạng lưới [75, 77]. 
* Trong 4 năm đầu tiên, phần thưởng này là **50 Bitcoin** cho mỗi khối [79].
* Phần thưởng này bị cắt giảm một nửa (halving) sau mỗi 210,000 khối (khoảng 4 năm một lần) [79]. Đến năm 2020, phần thưởng giảm xuống còn **6.25 Bitcoin** [202, 203].
* Do cơ chế giảm một nửa mang tính tiệm cận này, tổng cung Bitcoin sẽ hội tụ về mức giới hạn tối đa là **21 triệu đơn vị** vào khoảng năm 2140 [79]. Sau thời điểm đó, thợ đào sẽ chỉ được duy trì bằng nguồn thu từ **phí giao dịch (transaction fees)** [80].

---

## 2.5 Nguồn gốc và Quản trị (Origin and Governance)

Hệ thống Bitcoin không ra đời từ hư vô, mà là kết quả của nhiều thập kỷ nghiên cứu học thuật và các phong trào văn hóa công nghệ cụ thể [79, 80].

### 2.5.1 Ước mơ về Tiền kỹ thuật số ảo (The Dream of Virtual Cash)
Những bước đi đầu tiên hướng tới Bitcoin bắt đầu từ năm 1982 với phát minh của David Chaum về **DigiCash** [80]. Chaum lập luận rằng hệ thống thanh toán điện tử tập trung sẽ xâm phạm nghiêm trọng quyền riêng tư cá nhân và tạo ra các luồng dữ liệu nhạy cảm có thể bị theo dõi [80]. Điều này thúc đẩy ông phát triển một đơn vị tiền ảo có tính ẩn danh cao mô phỏng tiền mặt vật lý [80]. 

DigiCash sử dụng kỹ thuật **ký mù (blind signatures)** để ngăn ngân hàng trung ương theo dõi số sê-ri của các đồng tiền kỹ thuật số lưu thông [81]. Tuy nhiên, DigiCash vẫn là một hệ thống tập trung dựa trên sự tạo tiền độc quyền và sổ cái tập trung của một ngân hàng để ngăn chặn chi tiêu kép [80, 82]. Khi công ty DigiCash phá sản vào cuối những năm 1990, dự án này chính thức sụp đổ, cho thấy lỗ hổng chí tử của tính chất tập trung (SPOF - Single Point of Failure) [82].

Khát vọng phát triển tiền ảo ẩn danh được củng cố mạnh mẽ bởi **Tuyên ngôn mã hóa vô chính phủ (Crypto Anarchist Manifesto)** của Timothy C. May năm 1992 [428]. Ông dự báo một sự thay đổi xã hội sâu sắc được thúc đẩy bởi mật mã học, cho phép các cá nhân tương tác kinh tế trực tiếp và ẩn danh hoàn toàn độc lập với sự can thiệp của chính phủ [428, 429].

Năm 1998, nhà khoa học máy tính Wei Dai công bố bài luận ngắn giới thiệu ý tưởng về **b-money** [429]. Hệ thống b-money sử dụng các cặp khóa mật mã làm bút danh và đề xuất một cơ chế tạo tiền cạnh tranh thông qua việc giải các câu đố toán học tốn phí tính toán [429, 430, 431]. Tuy nhiên, b-money không đưa ra giải pháp cụ thể để đạt được sự đồng thuận giao dịch phi tập trung mà giả định sự tồn tại của một kênh truyền thông đồng bộ hoàn hảo [430].

Ý tưởng tạo ra các tác vụ nhân tạo đắt đỏ bắt nguồn từ các nghiên cứu của Adam Back cũng như Cynthia Dwork và Moni Naor, ban đầu được phát triển để chống lại các cuộc tấn công DoS và thư rác [431]. Các nghiên cứu này là nền tảng cho giao thức đồng thuận bằng chứng công việc (Proof of Work) trong Bitcoin [431].

Năm 2005, Hal Finney giới thiệu hệ thống **Bằng chứng công việc có thể tái sử dụng (RPOW)** kết hợp các ý tưởng của Wei Dai và Adam Back [432]. Cùng năm đó, Nick Szabo xuất bản bài viết về **Bit Gold** [432]. Bit Gold mô tả việc ứng dụng Proof of Work để tạo ra các đơn vị tiền tệ cạnh tranh đồng thời bảo vệ sổ cái công khai [432]. Mặc dù bài viết của Szabo không được trích dẫn trực tiếp trong sách trắng của Bitcoin, Bit Gold được thừa nhận rộng rãi là nguồn đóng góp quan trọng nhất cho sự ra đời của Bitcoin [432, 433].

### 2.5.2 Satoshi Nakamoto
Vào ngày 31 tháng 10 năm 2008, một bài báo khoa học có tiêu đề *"Bitcoin: A Peer-to-Peer Electronic Cash System"* được gửi tới một danh sách email về mật mã học dưới bút danh **Satoshi Nakamoto** [4, 433]. Cho đến nay, danh tính thực sự của Satoshi Nakamoto vẫn là một trong những bí ẩn lớn nhất của thời đại công nghệ [433].

---

> ### Hộp 2.2: Những suy đoán về danh tính Satoshi Nakamoto
> 
> Vào tháng 3 năm 2014, nhà báo Leah McGrath Goodman của tờ *Newsweek* gây chấn động khi tuyên bố đã tìm thấy người sáng lập Bitcoin là một người Mỹ gốc Nhật tên là **Dorian Satoshi Nakamoto** sống tại California [434]. Tuy nhiên, Dorian sau đó đã phủ nhận hoàn toàn và tuyên bố ông chưa bao giờ nghe nói hay làm việc với Bitcoin trước đó [434, 435].
> 
> Những ứng viên thực sự phải sở hữu kiến thức liên ngành cực kỳ chuyên sâu về mật mã học, kinh tế học và khoa học máy tính [435]. Nhiều người suy đoán đó có thể là **Nick Szabo** (người tạo ra Bit Gold) dựa trên các phân tích đối chiếu văn phong [435]. Một ứng viên nặng ký khác là **Hal Finney**, nhà mật mã học xuất sắc sống gần nhà Dorian Nakamoto, và là người đầu tiên nhận giao dịch Bitcoin từ Satoshi vào năm 2009 [435, 436].
> 
> Nhiều người khác cũng tự nhận mình là Satoshi Nakamoto, nổi tiếng nhất là Craig Steven Wright (một doanh nhân người Úc), nhưng tất cả các bằng chứng đưa ra đều bị cộng đồng chứng minh là giả mạo hoặc ngụy tạo [436, 437].

---

### 2.5.3 Quản trị Bitcoin (The Governance of Bitcoin)
Bitcoin không thuộc sở hữu của bất kỳ cá nhân hay công ty nào, cũng như không chịu sự kiểm soát của một thực thể duy nhất [7]. Bitcoin có cấu trúc hoàn toàn phi tập trung và mã nguồn mở (open source) [437]. Sự phát triển của Bitcoin được định hình bởi sự tương tác phức tạp của nhiều bên liên quan (stakeholders) [7, 437].

#### Bản sao Bitcoin: Altcoins
Mã nguồn của Bitcoin là công khai [438]. Bất kỳ ai cũng có thể sao chép, sửa đổi các tham số (chẳng hạn như tổng cung, thời gian tạo khối) để tạo ra một đồng tiền kỹ thuật số mới gọi là **Altcoins** (ví dụ: Litecoin, Namecoin) [439]. Việc nhân bản này tạo ra một đơn vị tiền tệ và sổ cái chuỗi khối hoàn toàn độc lập, không làm ảnh hưởng đến tổng số lượng giới hạn 21 triệu đơn vị của chuỗi khối Bitcoin gốc [439].

---

> ### Hộp 2.3: Sự tương đồng giữa Altcoins và Bóng đá
> 
> Luật chơi bóng đá là hoàn toàn tự do và công khai [439]. Bất kỳ nhóm người chơi nào cũng có thể tự do thay đổi luật chơi cho phù hợp với trận đấu của họ (chẳng hạn như giảm kích thước sân bóng, thay đổi số lượng cầu thủ hoặc thời gian thi đấu) [439]. Tuy nhiên, trận đấu tự phát này là độc lập và không thể được tính vào giải đấu chính thức FIFA World Cup. 
> 
> Tương tự, việc sao chép mã nguồn Bitcoin để tạo ra một Altcoin mới rất dễ dàng, nhưng để Altcoin đó có được giá trị, sự tin tưởng, hiệu ứng mạng lưới rộng lớn và vốn hóa thị trường khổng lồ như Bitcoin gốc là điều cực kỳ khó khăn [440].

---

#### Quá trình ra quyết định và các đợt phân tách chuỗi (Forks)
Để tránh hệ thống rơi vào trạng thái tĩnh cứng nhắc (có thể dẫn đến lỗi hệ thống nghiêm trọng khi có lỗ hổng bảo mật), Bitcoin cần một quy trình nâng cấp và thích ứng [441, 442]. Quy trình này được formal hóa thông qua các đề xuất nâng cấp gọi là **BIP (Bitcoin Improvement Proposals)** [91, 443].

Khi có sự bất đồng quan điểm sâu sắc trong cộng đồng về việc triển khai các quy tắc mới, chuỗi khối có nguy cơ bị phân tách thành hai chuỗi khối hoạt động song song dưới các quy tắc khác nhau, gọi là hiện tượng **phân tách (fork)** [92, 444].

Chúng ta phân biệt ba loại phân tách chính:

* **Soft fork (Phân tách mềm):** Là một bản nâng cấp có tính tương thích ngược (backward-compatible) [93, 444]. Phần mềm mới siết chặt các quy tắc chấp nhận (quy tắc mới là một tập hợp con của quy tắc cũ) [93, 444, 446]. Các khối được tạo ra bởi phần mềm mới nâng cấp sẽ được các nút mạng chạy phiên bản cũ chấp nhận là hợp lệ [446]. Soft fork sẽ tự động biến mất và hợp nhất lại nếu đa số sức mạnh tính toán (hashing power) của mạng lưới áp dụng phiên bản mới [95, 450].
* **Hard fork (Phân tách cứng):** Là bản nâng cấp không tương thích ngược (not backward-compatible) [92, 446]. Phần mềm mới mở rộng các tiêu chuẩn chấp nhận [446]. Các khối được tạo bởi phần mềm mới sẽ bị các nút mạng cũ từ chối [446]. Nó buộc mọi người tham gia mạng lưới đều phải cập nhật lên phiên bản mới để có thể tiếp tục đồng hành [454]. Nếu có một bộ phận nút mạng cũ từ chối nâng cấp, chuỗi khối sẽ bị chia làm hai phiên bản sổ cái tồn tại vĩnh viễn [450, 451].
* **Forced fork (Phân tách cưỡng bức):** Sử dụng bộ quy tắc hoàn toàn mới khác biệt, không tương thích ngược cũng không tương thích xuôi [94, 451]. Nó ngay lập tức và luôn luôn dẫn đến hai phiên bản sổ cái chuỗi khối riêng biệt hoạt động độc lập [94, 451].

---

> ### Hộp 2.4: Ví dụ về Soft Fork và Hard Fork thông qua Giới hạn Kích thước Khối
> 
> * **Giảm giới hạn kích thước khối (ví dụ từ 1MB xuống 0.5MB):** Là một **Soft fork** [94]. Khối mới có kích thước 0.5MB đáp ứng hoàn hảo quy tắc cũ (dưới 1MB), vì vậy phần mềm cũ vẫn xem khối đó là hợp lệ [94, 448].
> * **Tăng giới hạn kích thước khối (ví dụ từ 1MB lên 8MB):** Là một **Hard fork** [94]. Nếu một khối mới được tạo ra có kích thước 5MB, phần mềm cũ chạy quy tắc tối đa 1MB sẽ ngay lập tức từ chối khối đó là bất hợp pháp, gây ra sự phân tách chuỗi [94, 448].

---

> ### Hộp 2.5: Sự cố phân tách chuỗi năm 2013 do cập nhật phần mềm
> 
> Vào ngày 19 tháng 2 năm 2013, phiên bản 0.8.0 của Bitcoin Qt (nay là Bitcoin Core) được phát hành [451]. Bản cập nhật này vô tình sửa đổi một cơ chế hệ thống làm mở rộng phạm vi chấp nhận kích thước của các khối ghi chép cơ sở dữ liệu [451, 452]. 
> 
> Do một số thợ đào lớn vẫn chạy phiên bản cũ 0.7.0, vào ngày 11 tháng 3 năm 2013, một khối lớn được tạo ra bởi thợ đào chạy bản 0.8.0 đã bị các thợ đào chạy bản 0.7.0 từ chối, gây ra một đợt **Hard fork ngoài ý muốn** [452]. Để giải quyết khủng hoảng, các thợ đào lớn đã đồng ý tạm thời hạ cấp phần mềm của họ quay lại bản 0.7.0 để chuỗi của phiên bản cũ đạt ưu thế thống trị, giúp hợp nhất lại sổ cái trước khi tiến hành một đợt di cư phối hợp an toàn hơn lên bản 0.8.0 [452, 453].

---

Mặc dù thợ đào (miners) trực tiếp tham gia vào việc bỏ phiếu kích hoạt nâng cấp thông qua các khối họ đào được, họ không thể độc đoán áp đặt ý chí lên mạng lưới [96, 458]. Các bên liên quan khác như sàn giao dịch, ví, thương nhân và người dùng có một quyền phủ quyết ngầm (implicit veto) [455, 456]. Nếu thợ đào thúc đẩy một bản nâng cấp không được người dùng ủng hộ, giá trị thị trường của Bitcoin trên chuỗi đó sẽ sụp đổ, khiến phần thưởng của thợ đào mất đi giá trị thực tế [456, 458]. Sự giằng co quyền lực phức tạp này đảm bảo tính ổn định và bảo thủ của lớp nền tảng Bitcoin [459].

---

### 2.5.4 Các sự kiện quan trọng trong lịch sử Bitcoin (Important Events)

* **2009:** Mạng lưới Bitcoin chính thức hoạt động vào tháng 1 [85]. Giai đoạn đầu, Bitcoin chỉ là món đồ chơi công nghệ của các nhà mật mã học và được chuyển miễn phí cho nhau [98]. Ước tính giá đầu tiên dựa trên chi phí tiền điện để đào Bitcoin được thực hiện vào ngày 5 tháng 10 năm 2009, định giá **1 BTC = $0.000764** [460].
* **2010:** Sàn giao dịch Bitcoin Market ra đời vào tháng 2 [460]. Vào ngày 22 tháng 5 năm 2010, một lập trình viên tên là Laszlo Hanyecz đã thực hiện giao dịch mua hàng hóa thực tế đầu tiên bằng Bitcoin: mua 2 chiếc pizza với giá **10,000 BTC** (tương đương tỷ giá lịch sử $0.0025/BTC) [461]. Tháng 7 năm 2010, sàn giao dịch khét tiếng **MtGox** đi vào hoạt động tại Nhật Bản, nhanh chóng trở thành cổng giao dịch lớn nhất thế giới [461, 462].
* **2011:** Bitcoin lần đầu tiên đạt ngang giá 1 USD vào ngày 10 tháng 2 năm 2011 [464]. Sự ra đời của chợ đen **Silk Road** (hoạt động từ tháng 2 năm 2011 dùng Bitcoin làm tiền tệ độc quyền) đã thúc đẩy nhu cầu sử dụng thực tế và đẩy giá đạt đỉnh gần **32 USD** vào tháng 6 [464, 465]. Vụ tấn công MtGox sau đó và việc Wikileaks chấp nhận quyên góp bằng Bitcoin đã tạo ra những đợt biến động giá cực mạnh [465, 466].
* **2012:** FBI công bố báo cáo về rủi ro của Bitcoin [467]. Các cổng thanh toán như BitPay phát triển giúp hơn 1,000 doanh nghiệp chấp nhận Bitcoin [468]. WordPress trở thành doanh nghiệp lớn đầu tiên chấp nhận thanh toán bằng BTC [468]. Ngày 28 tháng 11 năm 2012, đợt halving đầu tiên diễn ra tại khối số 210,000, giảm phần thưởng khối từ 50 xuống 25 BTC [469].
* **2013:** Cuộc lạm phát và khủng hoảng nợ tại Cộng hòa Síp (Cyprus) thúc đẩy dòng vốn tìm kiếm các tài sản thay thế ngoài tầm với của chính phủ, đẩy giá Bitcoin vượt **200 USD** vào tháng 4 [470, 471]. Sàn MtGox sụp đổ một phần do sự thao túng của bot giao dịch (Willy Report) [474]. Vào ngày 2 tháng 10, Silk Road bị triệt phá, Ross Ulbricht bị bắt giữ [472]. Bitcoin kết thúc năm với giá tăng hơn 5,400% so với đầu năm, thiết lập đỉnh lịch sử trên **1,000 USD** [473, 474].
* **2014:** Nhiều tập đoàn lớn như Overstock, Dish Network, Expedia, Dell bắt đầu chấp nhận Bitcoin [474]. Sàn giao dịch MtGox chính thức nộp đơn phá sản vào tháng 2 sau khi phát hiện mất hàng trăm ngàn Bitcoin do lỗi Transaction Malleability (tính dễ dập nát của giao dịch) kéo dài nhiều năm [156, 475]. Giá Bitcoin sụt giảm 60% trong năm [475].
* **2015:** Sàn Bitstamp bị hack mất 5.1 triệu USD [475]. Dòng vốn đầu tư mạo hiểm đổ mạnh vào lĩnh vực này (ví dụ: công ty 21 Inc nhận khoản đầu tư kỷ lục 116 triệu USD) [476]. Tòa án Công lý Châu Âu phán quyết rằng các giao dịch trao đổi Bitcoin được miễn thuế giá trị gia tăng (VAT) [477]. Sự quan tâm của giới tài chính chuyển dịch mạnh sang thuật ngữ "Blockchain" [477].
* **2016:** ShapeShift bị hacker tấn công nhiều lần bởi chính nhân viên cũ [478]. Sàn Bitfinex bị hack tổn thất lớn [479]. Đợt halving thứ hai diễn ra vào tháng 7, giảm phần thưởng khối xuống còn 12.5 BTC [286]. Bất ổn chính trị toàn cầu và sự kiểm soát dòng vốn ở Trung Quốc đẩy giá Bitcoin hồi phục chậm rãi [479].
* **2017:** Bitcoin bước vào tâm điểm chú ý toàn cầu [479]. Giá khởi đầu từ 1,000 USD và đạt đỉnh lịch sử gần **19,500 USD** vào ngày 17 tháng 12 [479, 480]. Cơn sốt Ethereum và ICO bùng nổ, kéo theo phí giao dịch Bitcoin tăng vọt lên mức hàng chục USD do mạng lưới tắc nghẽn [480, 482]. Nâng cấp Segregated Witness (SegWit) được kích hoạt thành công qua soft fork vào ngày 21 tháng 7 [483]. Bất đồng quan điểm về kích thước khối dẫn đến việc phân tách chuỗi khối tạo ra đồng **Bitcoin Cash (B-Cash)** vào ngày 1 tháng 8 [483, 484].
* **2018:** Bong bóng tiền mã hóa vỡ tan [484]. Giá Bitcoin sụt giảm thảm khốc về mức đáy khoảng **3,200 USD** vào tháng 12 [484]. Các tài sản Altcoin và token ICO khác ghi nhận mức giảm từ 90% đến 99% [484]. Tuy nhiên, cơ sở hạ tầng xung quanh tiền mã hóa trở nên chuyên nghiệp và chuẩn chỉnh hơn [485].
* **2019:** Giai đoạn phục hồi tích lũy, giá dao động và vượt mốc 10,000 USD trước khi lùi về khoảng 7,000 USD vào cuối năm [485]. Facebook công bố dự án đồng stablecoin Libra gây xôn xao dư luận chính giới [485]. Các cơ quan quản lý trên toàn cầu bắt đầu đẩy mạnh nghiên cứu phát triển Tiền kỹ thuật số của Ngân hàng Trung ương (CBDC) [485, 486].

---

## 2.6 Bài tập Chương 2 (Exercises)

* **Bài tập 2.1:** Giải thích cách phân loại Bitcoin liên quan đến cấu trúc kiểm soát tiền tệ và chỉ ra điểm khác biệt cơ bản nhất giữa nó và tiền gửi ngân hàng thương mại [104].
  * *Lời giải gợi ý:* Theo ma trận cấu trúc kiểm soát (Hình 2.1), Bitcoin được phân loại là: đại diện ảo, quy trình xử lý giao dịch phi tập trung và việc tạo tiền mang tính cạnh tranh [29]. Điểm khác biệt cơ bản nhất so với tiền gửi ngân hàng thương mại là: Tiền gửi ngân hàng thương mại là ảo và cạnh tranh nhưng việc xử lý giao dịch mang tính tập trung (dựa vào sổ sách kế toán của ngân hàng thương mại và các định chế trung gian) [32]. Trong khi đó, Bitcoin xử lý giao dịch hoàn toàn phi tập trung (peer-to-peer), không phụ thuộc vào bất kỳ thực thể hay tổ chức trung gian nào [33].
* **Bài tập 2.2:** Nêu tên các thành phần phụ của hệ thống Bitcoin và giải thích yêu cầu giao dịch nào mà mỗi thành phần này cần phải đáp ứng [104].
  * *Lời giải gợi ý:* Các thành phần phụ bao gồm:
    1. *Đơn vị Bitcoin (Bitcoin unit):* Đại diện ảo cho tài sản [34].
    2. *Mạng lưới Bitcoin (Bitcoin network):* Đáp ứng yêu cầu **Khả năng xử lý giao dịch (Transactional Capacity)** thông qua cấu trúc ngang hàng (P2P) giúp truyền tải thông điệp nhanh chóng và bền bỉ [34, 42].
    3. *Mật mã học bất đối xứng (Asymmetric cryptography):* Đáp ứng yêu cầu **Tính hợp lệ của giao dịch (Transactional Legitimacy)** bằng cách sử dụng các cặp khóa để ký và xác thực chữ ký kỹ thuật số, chứng minh quyền sở hữu hợp pháp [36, 45].
    4. *Chuỗi khối Bitcoin & Giao thức đồng thuận (Blockchain & Consensus protocol):* Đáp ứng yêu cầu **Sự đồng thuận giao dịch (Transactional Consensus)** thông qua cấu trúc chuỗi khối liên kết và thuật toán Proof of Work, giải quyết triệt để vấn đề chi tiêu kép mà không cần bên thứ ba [36, 37].
* **Bài tập 2.3:** Giải thích phương thức hoạt động của hệ thống Bitcoin dựa trên ba yêu cầu giao dịch cốt lõi của nó [104, 105].
  * *Lời giải gợi ý:* 
    1. *Khả năng giao dịch:* Giao dịch được phát sóng lên mạng lưới P2P, lan truyền qua các nút mạng bình đẳng một cách tự động [42, 43].
    2. *Tính hợp lệ giao dịch:* Mỗi nút mạng nhận được giao dịch sẽ dùng khóa công khai của người gửi để kiểm tra tính hợp lệ của chữ ký kỹ thuật số, đảm bảo tiền không bị chi tiêu trái phép và nội dung giao dịch không bị sửa đổi khi truyền dẫn [47, 48].
    3. *Sự đồng thuận giao dịch:* Các thợ đào gom các giao dịch hợp lệ vào khối, giải câu đố Proof of Work bằng cách tìm nonce thích hợp để băm đầu khối nhỏ hơn mục tiêu độ khó [55, 57]. Khối hợp lệ được liên kết vào chuỗi khối [58]. Mạng lưới đồng thuận chọn chuỗi có tổng độ khó tích lũy lớn nhất làm sổ cái chính thức [205].
* **Bài tập 2.4:** Giải thích sự khác biệt giữa Hard fork và Soft fork. Thay đổi phần mềm nào trong hai loại này đặt ra thách thức lớn hơn cho mạng lưới Bitcoin? [105]
  * *Lời giải gợi ý:* Soft fork là nâng cấp thắt chặt quy tắc, có tính tương thích ngược; các nút cũ vẫn chấp nhận các khối tạo bởi quy tắc mới [93, 444, 446]. Hard fork là nâng cấp nới lỏng quy tắc, không tương thích ngược; các khối quy tắc mới sẽ bị các nút chạy quy tắc cũ từ chối [446]. Hard fork đặt ra thách thức lớn hơn rất nhiều cho mạng lưới Bitcoin vì nó yêu cầu tất cả người dùng và cơ sở hạ tầng mạng lưới phải đồng loạt cập nhật phần mềm một cách riêng lẻ [96, 454]. Nếu có sự bất đồng và không nâng cấp đồng bộ, chuỗi khối sẽ bị phân tách vĩnh viễn thành hai chuỗi cạnh tranh, gây chia rẽ cộng đồng và bất ổn giá trị [450, 451].
* **Bài tập 2.5:** Nêu tên và mô tả ba sự kiện quan trọng định hình sự phát triển giá cả của đơn vị Bitcoin [105].
  * *Lời giải gợi ý:* Học viên có thể chọn 3 trong số các sự kiện sau:
    1. *Giao dịch mua Pizza của Laszlo (2010):* Xác lập tỷ giá thực tế đầu tiên của Bitcoin với hàng hóa thế giới thực ($0.0025/BTC cho 10,000 BTC) [461].
    2. *Sự sụp đổ của sàn MtGox (2014):* Sàn giao dịch lớn nhất xử lý phần lớn giao dịch Bitcoin phá sản do bị hacker lấy mất lượng lớn BTC, giáng đòn mạnh vào niềm tin người dùng và khiến giá Bitcoin sụt giảm 60% trong năm 2014 [475].
    3. *Sự kiện kích hoạt SegWit và đợt phân tách Bitcoin Cash (2017):* Việc nâng cấp SegWit thành công mở ra giải pháp mở rộng quy mô lớp hai (Lightning Network) kết hợp với cơn sốt ICO đã đẩy giá Bitcoin tăng vọt lên mức kỷ lục gần 19,500 USD, đồng thời tạo ra đợt phân tách cứng tạo ra Bitcoin Cash (B-Cash) do bất đồng về kích thước khối [479, 483, 484].
