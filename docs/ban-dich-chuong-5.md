# BẢN DỊCH CHƯƠNG 5: ĐỒNG THUẬN GIAO DỊCH (Transactional Consensus)

Trong chương này, chúng ta giải thích cách các giao dịch được đưa vào chuỗi khối Bitcoin và chỉ ra cách mạng lưới có thể đạt được sự đồng thuận về trạng thái hiện tại của sổ cái. Chúng ta sẽ nghiên cứu cấu trúc dữ liệu của các khối, thảo luận về cách các khối này được liên kết với nhau, đồng thời phân tích các nguyên lý cơ bản của việc khai thác (đào) Bitcoin, lý thuyết trò chơi làm nền tảng và cơ chế đồng thuận Bằng chứng công việc (Proof of Work).

---

## 5.1 Khối và Chuỗi khối (Blocks and the Blockchain)

Trong các chương trước, chúng ta đã giải thích cách những người tham gia mạng lưới tạo và truyền đi các thông điệp giao dịch, đồng thời chỉ ra cách họ có thể xác minh tính xác thực và toàn vẹn của các thông điệp giao dịch của những người tham gia khác. Mỗi nút đầy đủ (full node) duy trì tập hợp các giao dịch đã được xác minh của riêng mình (gọi là **mempool**) chưa được xác nhận, đang chờ để được đưa vào chuỗi khối Bitcoin. Các mempool này có khả năng khác nhau giữa các nút. Do đó, hệ thống Bitcoin phải cung cấp một quy trình cho phép mạng lưới đồng ý về những giao dịch nào nên được đưa vào chuỗi khối Bitcoin.

### 5.1.1 Chuỗi khối Bitcoin (The Bitcoin Blockchain)

Chuỗi khối Bitcoin là sổ cái công khai của hệ thống Bitcoin, chứa tất cả các giao dịch đã được xử lý kể từ khối khởi thủy (genesis block). Đây là một cơ sở dữ liệu liên tục mở rộng, cho phép người dùng truy vấn sự phân bổ của các đơn vị Bitcoin tại bất kỳ thời điểm nào. Để thu được thông tin liên quan từ đó, tất cả dữ liệu phải được phân tích cú pháp (parsed) - nghĩa là được định dạng một cách thích hợp.

Vào cuối năm 2019, chuỗi khối Bitcoin nắm giữ dung lượng dữ liệu khoảng **205 GB**. Hình 5.1 cho thấy sự phát triển của dung lượng dữ liệu này theo thời gian. Sự tăng trưởng này và thực tế là chuỗi khối Bitcoin phải được lưu trữ và xử lý bởi mọi nút đầy đủ trong hệ thống làm dấy lên những lo ngại về khả năng mở rộng (scalability) của hệ thống Bitcoin. Chúng ta sẽ giải quyết một số vấn đề này trong phần 6.2.

Mọi người tham gia mạng lưới đều có thể tải xuống một bản sao của chuỗi khối Bitcoin và độc lập xác minh mọi giao dịch. Người dùng cũng có thể sửa đổi bản sao đã tải xuống của mình. Tuy nhiên, do giao thức đồng thuận (xem phần 5.2.2), bản sao bị sửa đổi của chuỗi khối sẽ chỉ được chấp nhận bởi các thành viên khác trong mạng lưới nếu nó đáp ứng được một bộ quy tắc được định nghĩa rõ ràng. Nếu một nút không tuân thủ các quy tắc này, bản sao chuỗi khối Bitcoin được lưu trữ cục bộ của nó sẽ bị mọi người khác bỏ qua.

### 5.1.2 Các thành phần của một Khối (Components of a Block)

Chuỗi khối Bitcoin được cấu thành từ các khối (blocks). Mỗi khối chứa ít nhất một giao dịch. Hình 5.2 minh họa một ví dụ về một khối và liệt kê các nội dung của nó. Mỗi khối phải bao gồm các nội dung này và được định dạng theo đúng cách. Ngoài dữ liệu giao dịch, một khối phải bao gồm một phần gọi là **tiêu đề khối (block header)**, gồm **640 bits (80 bytes)** dữ liệu mô tả cho phép khối được nhận diện và định vị trong chuỗi khối. Chúng ta sẽ thảo luận sâu về các thành phần riêng lẻ của tiêu đề khối dưới đây:

*   **Phiên bản (Version):** Trường phiên bản xác định phiên bản của giao thức được sử dụng để tạo khối. Đây là một số 32-bit cung cấp thông tin về bộ quy tắc cơ bản hoạt động khi khối được tạo ra, và do đó tham chiếu đến các quy tắc phải được áp dụng để xác thực khối tương ứng. Việc nhập phiên bản là điều cần thiết cho khả năng sửa đổi các quy tắc. Nếu tất cả các khối trong chuỗi khối phải được xác thực bằng cùng một bộ quy tắc, thì sẽ không thể thay đổi bất kỳ quy tắc nào, ngay cả khi toàn bộ mạng lưới đều đồng ý rằng điều đó là cần thiết.
*   **Tham chiếu (Reference):** Trường tham chiếu liên kết khối hiện tại với một khối trước đó, thường được gọi là **khối cha (parent block)**.
*   **Nhãn thời gian (Timestamp):** Trường nhãn thời gian chứa thông tin liên quan đến thời gian mà khối được tạo ra. Nhãn thời gian phải nằm trong một khoảng thời gian quy định. Giới hạn dưới là giá trị trung vị (median) của nhãn thời gian của mười một khối trước đó, và giới hạn trên là hai giờ sau thời điểm khối được chấp nhận vào chuỗi khối.
*   **Giá trị ngưỡng (Threshold value):** Trường giá trị ngưỡng chứa giá trị tối đa mà giá trị băm của một khối có thể có để nó được mạng lưới coi là hợp lệ. Giá trị ngưỡng đóng một vai trò quan trọng trong giao thức đồng thuận và được thảo luận chi tiết ở phần 5.2.3.
*   **Nonce:** Trường nonce cho phép chèn dữ liệu tùy ý. Việc sửa đổi trường nonce đảm bảo rằng các khối có nội dung tương đương nhau nhưng vẫn có thể tạo ra các giá trị băm khác nhau. Mục nhập này đóng vai trò quyết định đối với giao thức đồng thuận và chúng ta sẽ quay lại vấn đề này trong phần 5.2.2.
*   **Rễ Merkle (Merkle Root):** Trường rễ Merkle chứa gốc của cây Merkle được xây dựng từ tất cả các giao dịch có trong khối. Bản thân các giao dịch không được kết hợp trực tiếp trong tiêu đề khối. Mục đích của rễ Merkle là đảm bảo tính toàn vẹn của các giao dịch có trong khối đó.

Trong một **cây Merkle (merkle tree)**, các giao dịch được sắp xếp theo từng cặp và giá trị băm của mỗi cặp được tính toán. Giá trị băm của các cặp liên tục được sắp xếp thành các cặp mới cho đến khi chỉ còn lại một giá trị băm duy nhất. Giá trị này chính là rễ Merkle; nói cách khác, là gốc được bảo mật bằng mật mã của cây Merkle. Nếu chỉ cần một giao dịch duy nhất trong cây bị thay đổi, rễ Merkle sẽ có một giá trị hoàn toàn khác biệt.

Bất kỳ sự sửa đổi nào đối với các giao dịch sẽ có tác dụng làm cho rễ Merkle ban đầu không còn nhất quán với các giao dịch đã sửa đổi. Khối ban đầu do đó sẽ trở nên không hợp lệ. Rễ Merkle là liên kết giữa tiêu đề khối và các giao dịch trong khối, đảm bảo rằng các giao dịch không thể bị thay đổi mà không bị phát hiện.

Hình 5.3 minh họa một cây Merkle nhỏ chỉ bao gồm ba giao dịch: $a$, $b$, và $c$. Bất cứ khi nào một cây Merkle có số lượng phần tử lẻ, phần tử cuối cùng sẽ được nhân đôi và tính toán giá trị băm của hai phần tử giống hệt nhau này. Trong ví dụ của chúng ta, chúng ta thấy quy trình này được áp dụng cho giá trị $c$.

Ưu điểm của cây Merkle là nó cho phép xác minh hiệu quả các giao dịch cụ thể. Với $N$ giao dịch, cần tối đa là $2 \log_2(N)$ bước tính toán để xác minh xem một giao dịch có phải là một phần tử của cây Merkle hay không, và do đó, là một phần tử của khối tương ứng.

### 5.1.3 Cấu trúc chuỗi (Chain Structure)

Một khối tham chiếu chính xác đến một khối cha (parent block) duy nhất (ngoại trừ khối khởi thủy - genesis block - là phần tử đầu tiên trong chuỗi khối Bitcoin nên không có khối cha). Những tham chiếu này tạo ra một chuỗi các khối liên tiếp, từ đó hình thành nên tên gọi: chuỗi khối (blockchain).

Mỗi khối hợp lệ có một vị trí cụ thể trong chuỗi này, được định nghĩa bởi hai khái niệm: **chiều cao khối (block height)** và **độ sâu khối (block depth)**.
*   **Chiều cao khối (block height):** Xác định vị trí của một khối nhất định trong chuỗi, trong đó khối đầu tiên (khối khởi thủy) được gán số 0.
*   **Độ sâu khối (block depth):** Đề cập đến khoảng cách của một khối so với khối gần đây nhất. Vì lý do này, độ sâu của một khối tăng lên tương ứng với mỗi khối mới được thêm vào chuỗi khối Bitcoin. Độ sâu khối là thông số rất quan trọng đối với các phân tích bảo mật. Hơn nữa, nó cũng cung cấp cho các nút SPV một phép đo cảm quan (heuristic) để đánh giá tính hợp lệ của các giao dịch (xem phần 3.2.2).

Hình 5.4 cho thấy một ví dụ về một chuỗi như vậy và các thuật ngữ tương ứng được sử dụng để xác định vị trí của khối trong chuỗi khối. Trong ví dụ này, khối thứ ba từ trái sang có chiều cao khối là 2. Vì khối này chỉ có một khối kế nhiệm duy nhất, hiện tại nó có độ sâu khối là 1.

Cách thứ ba để xác định một khối là sử dụng **số nhận diện khối (block's identification number)**; hay chính là giá trị băm của tiêu đề khối (block header's hash value). Để tính toán nó, tiêu đề khối được đưa vào hàm băm **SHA256d**, nơi các bit riêng lẻ được sắp xếp lại một cách đơn định và sửa đổi thông qua một quy trình bao gồm 64 vòng của các thuật toán phi tuyến tính khác nhau. Giá trị băm thu được sau đó lại được đưa vào hàm băm này cho lượt chạy thứ hai gồm 64 vòng khác nữa. Khả năng kháng va chạm (collision resistance) của hàm băm (xem phần 4.2) đảm bảo rằng không có hai khối nào trong chuỗi có cùng một số nhận diện giống nhau.

Các giá trị băm SHA256 có độ dài 256 bits. Để đơn giản hóa, các giá trị này thường được định dạng dưới dạng một số thập lục phân (hexadecimal) gồm 64 ký tự. Một ví dụ về một giá trị băm như vậy là `000000342bb08fa10ea042f4a6ce3b140c390f997816b7f353ddd806ac5db1ec`. Giá trị băm này tương ứng với số nhận diện của khối đầu tiên trong ví dụ về chuỗi được trình bày trong Hình 5.5.

Bây giờ chúng ta hãy xem xét cấu trúc liên kết chuỗi. Mỗi khối mới tham chiếu đến khối cuối cùng trong chuỗi như là khối tiền nhiệm của nó (khối cha). Để liên kết một khối với khối cha của nó, trường tham chiếu trong tiêu đề khối của một khối mới sẽ chứa giá trị băm của khối cha. Hình 5.5 trình bày hai ví dụ. Khối thứ hai trong chuỗi tham chiếu đến giá trị băm của khối thứ nhất. Khối thứ ba trong chuỗi tham chiếu đến giá trị băm của khối thứ hai.

Vì trường tham chiếu là một phần của tiêu đề khối, nó sẽ ảnh hưởng trực tiếp đến giá trị băm của chính khối đó. Do đó, nếu ai đó sửa đổi trường tham chiếu hoặc bất kỳ thông tin nhập vào nào khác của một khối, giá trị băm của khối đó chắc chắn sẽ thay đổi.

Trong Hình 5.6, một giao dịch đã được thêm vào Khối 1. Sự bổ sung này làm thay đổi rễ Merkle của khối, và từ đó thay đổi giá trị băm của tiêu đề khối. Giá trị mới thu được là `ae21f25523ae1d4e3864583d2b99d27bfc4cf00dbf6281951aff01fe809e9534`. Trường tham chiếu của khối thứ hai vẫn chứa giá trị cũ `000000342bb08fa10ea042f4a6ce3b140c390f997816b7f353ddd806ac5db1ec`. Vì giá trị băm mới của Khối 1 không được tham chiếu trong trường tham chiếu của Khối 2, liên kết giữa hai khối này đã bị phá vỡ.

Để khôi phục liên kết giữa Khối 1 and Khối 2, trường tham chiếu trong tiêu đề của Khối 2 phải được cập nhật để chứa số nhận diện mới của Khối 1. Tuy nhiên, sự sửa đổi này ngay lập tức phá vỡ liên kết giữa Khối 2 và Khối 3 vì nó làm mất hiệu lực tham chiếu của Khối 3 đối với Khối 2. Hình 5.7 cho thấy sự sửa đổi đối với tham chiếu của Khối 2 ảnh hưởng đến giá trị băm của nó như thế nào và điều này khiến tham chiếu của Khối 3 trở nên không hợp lệ ra sao.

Ví dụ này làm nổi bật **phản ứng dây chuyền (chain reaction)** vốn là nền tảng cho mô hình bảo mật của chuỗi khối. Nếu một khối bị sửa đổi, chuỗi sẽ bị đứt gãy và tất cả các khối tiếp theo sẽ trở nên không hợp lệ. Do đó, các sửa đổi có tác dụng làm ngắn chuỗi lại. Để một chuỗi duy trì được chiều dài ban đầu với thông tin đã bị sửa đổi, khối bị sửa đổi và tất cả các khối tiếp theo đều phải được tính toán lại từ đầu.

### 5.1.2 Các thành phần của một Khối (Components of a Block)

Để mở rộng chuỗi khối, các nút tạo ra các khối ứng viên mới (candidate blocks). Họ có thể sử dụng bất kỳ tập hợp con các giao dịch nào từ mempool của mình, tính toán rễ Merkle và lắp ráp thành các khối ứng viên mới. Làm giá trị tham chiếu, họ lấy số nhận diện của khối cuối cùng trong chuỗi hiện tại.

Tony là một người tham gia mạng lưới thực hiện chức năng này và cố gắng tạo ra các khối mới. Anh chọn một số giao dịch từ mempool của mình để đưa vào khối ứng viên. Tony đã xác minh tính hợp lệ của các giao dịch này khi anh nhận được chúng. Do đó, anh biết rằng mỗi giao dịch đều đi kèm với các tập lệnh mở khóa (redeem script) hợp lệ cho các điều kiện khóa của tất cả các đầu ra được tham chiếu. Ngoài ra, anh xác minh rằng các giao dịch chỉ sử dụng các đầu ra giao dịch chưa chi tiêu (UTXO). Tony cũng tham chiếu đến khối cuối cùng trong phiên bản đồng thuận của chuỗi khối Bitcoin.

Sau đó, anh tính toán giá trị băm của khối ứng viên mới của mình và tiếp tục gửi nó đến các nút khác. Tuy nhiên, bước này là một vấn đề nan giải. Tony không phải là người duy nhất trong mạng lưới tạo ra một khối ứng viên mới. Các nút khác cũng đã hình thành các khối ứng viên mới. Tất cả các khối ứng viên này đều tham chiếu đến cùng một khối cha. Việc sản xuất đồng thời các khối mới có khả năng tạo ra các phiên bản cạnh tranh và không tương thích lẫn nhau của chuỗi khối Bitcoin. Một ví dụ về tình huống như vậy được minh họa trong Hình 5.8 (nơi xuất hiện bảy phiên bản chuỗi khối cạnh tranh khác nhau).

Ví dụ hiện tại nhấn mạnh rằng cấu trúc chuỗi tự thân nó không đảm bảo các nút khác nhau có thể đồng ý về một phiên bản hợp lệ duy nhất. Chỉ khi chúng ta bổ sung thêm các quy tắc bổ sung thì mạng lưới mới có thể đạt được sự đồng thuận trên toàn hệ thống.

---

## 5.2 Giao thức đồng thuận (Consensus Protocol)

Trong mạng lưới Bitcoin, bất kỳ ai cũng có thể điều chỉnh bản sao chuỗi khối Bitcoin cá nhân của mình. Không có bên trung tâm nào xác định phiên bản chuỗi khối nào tương ứng với trạng thái thực tế. Do đó, có thể xảy ra các tình huống mà những người tham gia mạng lưới không thống nhất được về trạng thái thực của chuỗi khối. Để giải quyết vấn đề này, hệ thống Bitcoin dựa trên một bộ quy tắc đồng thuận được xác định trước, cho phép xác định một phiên bản sổ cái Bitcoin duy nhất là phiên bản chính xác.

Phần mềm ứng dụng khách Bitcoin phổ biến nhất tuân thủ tất cả các quy tắc đồng thuận theo mặc định. Tuy nhiên, các thiết lập mặc định không cung cấp bất kỳ sự bảo vệ nào chống lại hành vi lệch lạc. Những người tham gia mạng lưới có thể viết phần mềm khách của riêng họ hoặc điều chỉnh các phần mềm khách hiện có với một bộ quy tắc khác. Trong kinh tế học, **lý thuyết lựa chọn hợp lý (rational choice theory)** giả định rằng một người lý trí sẽ không tuân thủ các quy tắc nếu việc đó mang lại lợi nhuận. Do đó, giao thức đồng thuận phải được xây dựng theo cách mà các cá nhân tự nguyện tuân thủ các quy tắc hiện có thông qua chính lợi ích cá nhân của họ.

Các khuyến khích kinh tế tương ứng được thực hiện thông qua nhiều cơ chế khác nhau. Nguyên tắc cơ bản là hành vi gian lận rất tốn kém và tất cả những người tham gia mạng lưới đều có thể phát hiện ra nó ngay lập tức. Ngược lại, hành vi trung thực được hệ thống đền đáp thông qua cơ chế phần thưởng. Trong phần tiếp theo, chúng ta thảo luận về từng thành phần cơ bản của giao thức đồng thuận và chỉ ra cách chúng ảnh hưởng đến hành vi của những người tham gia mạng lưới.

### 5.2.1 Chỉ chấp nhận các giao dịch hợp lệ (Only Legitimate Transactions)

Quy tắc đồng thuận cơ bản nhất là chuỗi khối Bitcoin chỉ có thể chứa các giao dịch hợp lệ. Tính hợp lệ của giao dịch có thể được xác thực độc lập bởi mọi nút đầy đủ như đã mô tả trong Chương 4. Ngoài ra, còn có một loạt các kiểm tra khác, tất cả đều nhằm xác định tính hợp lệ của giao dịch và các khối chứa chúng. Nhiều kiểm tra trong số này chỉ đóng vai trò bảo vệ chống lại việc quá tải cưỡng bức của mạng lưới (các cuộc tấn công từ chối dịch vụ - DoS).

Việc thực hiện các bước xác thực này tốn rất ít tài nguyên tính toán. Do đó, các khối ứng viên chứa các giao dịch không hợp lệ sẽ ngay lập tức bị vạch trần và bị phần còn lại của mạng lưới bỏ qua. Kết quả là, nếu ai đó thêm các giao dịch gian lận vào một khối ứng viên, điều đó sẽ khiến khối ứng viên đó bị tất cả những người tham gia mạng lưới khác từ chối. Điều này làm tiêu tan mọi cơ hội được nhận phần thưởng cho việc tạo ra khối ứng viên đó. Vì vậy, hành vi hợp lý duy nhất là chỉ đưa vào các giao dịch hợp lệ.

### 5.2.2 Bằng chứng công việc (Proof of Work)

Trong ví dụ ở Hình 5.8, bảy phiên bản chuỗi khối cạnh tranh đã xuất hiện vì có quá nhiều khối hợp lệ được tạo ra đồng thời. Công suất tính toán cần thiết để tạo ra một khối ứng viên nhỏ đến mức quy trình này có thể được hoàn thành trong một phần nhỏ của giây, ngay cả với một thiết bị di động. Điều này dẫn đến hậu quả là các khối ứng viên mới có thể được tạo ra nhanh hơn nhiều so với thời gian cần thiết để truyền tải chúng qua mạng lưới. Do đó, chúng ta cần một hạn chế nhân tạo để làm cho việc tạo ra một khối ứng viên hợp lệ trở nên khó khăn hơn, từ đó cung cấp cho mạng lưới thời gian cần thiết để trao đổi dữ liệu và đạt được sự đồng thuận. Điều này đạt được thông qua cơ chế đồng thuận **Bằng chứng công việc (Proof of Work)**.

Bằng chứng công việc ban đầu được phát triển để chống lại thư rác (spam email) và các cuộc tấn công DoS (xem phần 5.3.5). Ý tưởng cơ bản là nếu một hoạt động có thể được thực hiện quá nhanh, nó cần phải được làm chậm lại. Điều này đạt được bằng cách yêu cầu hoạt động đó phải trình bày lời giải cho một bài toán toán học tốn nhiều thời gian. Bài toán toán học liên quan chỉ có thể giải được bằng phương pháp thử và sai (trial-and-error). Trung bình, chỉ có một trong số $x$ lần thử tạo ra kết quả mong muốn.

Nguyên tắc này áp đặt các chi phí nhân tạo lên hoạt động đào. Các chi phí này cung cấp sự bảo vệ bằng cách cản trở hoạt động quá mức trong bối cảnh thư rác và tấn công DoS. Đồng thời, các chi phí phát sinh trong quá trình sử dụng bình thường là không đáng kể. Trong bối cảnh của Bitcoin, quy trình này mang lại một số tác động như sau:

*   Nó giải quyết vấn đề các khối được tạo ra quá nhanh.
*   Nó đảm bảo rằng chuỗi không thể bị thay đổi và tái tạo lại mà không tốn chi phí. Do đó, nó được bảo vệ bởi toàn bộ năng lực băm đã bỏ ra để xây dựng nó.
*   Nó thúc đẩy các nút hành xử trung thực, vì năng lực băm tốn kém mà họ đầu tư vào nếu không sẽ bị lãng phí.

Bằng chứng công việc được triển khai trong mạng lưới Bitcoin bằng cách sử dụng tiêu đề khối (block header) của khối ứng viên. Giá trị băm của nó phải sở hữu một đặc tính cực kỳ hiếm: nó phải nằm dưới một **giá trị ngưỡng (threshold value)** nhất định; nghĩa là, nó phải hiển thị nhiều chữ số 0 ở đầu số nhận diện. Chỉ khi đó, khối ứng viên mới được phần còn lại của mạng lưới coi là hợp lệ.

Giả sử ngưỡng hiện tại là `1000000000000000000000000000000000000000000000000000000000000000` (ở hệ thập lục phân). Trong trường hợp này, tất cả các số nhận diện có chữ số 0 ở vị trí đầu tiên trong ký hiệu thập lục phân sẽ hợp lệ. Ngưỡng này sẽ có tác dụng là, tính trung bình, chỉ có một trong mười sáu khối ứng viên nằm trong phạm vi này (ký hiệu thập lục phân sử dụng mười sáu ký tự khả dĩ từ 0-9 và A-F). Với ngưỡng này, toàn bộ mạng lưới sẽ phải tạo ra trung bình 16 khối ứng viên để tạo ra một khối hợp lệ.

Nếu giá trị băm của tiêu đề khối nằm trên ngưỡng, khối đó sẽ bị từ chối. Nút khai thác sau đó sẽ thực hiện những thay đổi nhỏ đối với nội dung khối và tính toán một giá trị băm mới. Quy trình lặp đi lặp lại này được gọi là **khai thác (mining)**.

Nguồn gốc của sự biến đổi chủ yếu là trường **nonce**. Nonce là một trường chứa dữ liệu tùy ý mà khi các nội dung khối khác giống hệt nhau, nó sẽ làm thay đổi hoàn toàn giá trị băm thu được. Nếu không gian biến đổi trong trường nonce không đủ, thì nhãn thời gian và tập lệnh mở khóa của giao dịch coinbase (extra-nonce) có thể được điều chỉnh (sự thay đổi trong giao dịch coinbase sẽ làm thay đổi rễ Merkle của khối).

Hình 5.9 tóm tắt quy trình khai thác. Thợ đào bắt đầu bằng cách chọn các giao dịch từ mempool của mình và xác minh rằng chúng hợp lệ. Sau đó, anh ta chọn một giá trị nonce ban đầu và tính toán giá trị băm của tiêu đề khối. Nếu giá trị băm lớn hơn ngưỡng hiện tại, anh ta chọn một giá trị nonce khác và tính toán lại. Chỉ khi giá trị băm của khối ứng viên vô tình rơi xuống dưới ngưỡng hiện tại, anh ta mới truyền khối này lên mạng lưới. Phía bên phải của Hình 5.9 cho thấy những gì các nút đầy đủ khác thực hiện khi họ nhận được khối: họ xác minh tất cả các giao dịch và tính toán lại giá trị băm để đảm bảo điều kiện ngưỡng được đáp ứng trước khi đưa khối vào bản sao chuỗi khối cục bộ của mình.

"Khai thác" là sự điều chỉnh không ngừng của nonce để tìm kiếm một khối ứng viên hợp lệ. Một chu kỳ bắt đầu bằng việc điều chỉnh nonce và kết thúc bằng việc so sánh giá trị băm với ngưỡng hiện tại. Chu kỳ này được lặp lại cho đến khi tìm thấy một giá trị băm hợp lệ. Hình 5.10 minh họa sự thay đổi lặp đi lặp lại của nonce để tìm ra giá trị băm hợp lệ đầu tiên bắt đầu bằng số 0 (trong ví dụ này, nonce hợp lệ là `0000000D`).

### 5.2.3 Ngưỡng động và Độ khó (Dynamic Threshold and Difficulty)

Trong hệ thống Bitcoin, độ khó khai thác được điều chỉnh động để đảm bảo rằng toàn bộ mạng lưới, tính trung bình, tạo ra một khối hợp lệ sau mỗi mười phút. Độ khó được hiệu chuẩn lại sau mỗi **2,016 khối** (khoảng hai tuần dựa trên mức trung bình 10 phút một khối). Do quy trình khai thác mang tính xác suất và những thay đổi trong tổng công suất tính toán, thời gian thực tế $t$ để mạng lưới tạo ra 2,016 khối sẽ dao động.

Độ khó được điều chỉnh thông qua sự thay đổi của giá trị ngưỡng $\delta$. Bất kỳ nút đầy đủ nào cũng có thể độc lập tính toán giá trị ngưỡng mới bằng cách sử dụng phương trình sau:

$$\delta_{new} = \delta_{old} \cdot rac{t}{E(t)}$$

Trong đó $E(t) = 20,160$ phút (khoảng 14 ngày). Nếu $t < E(t)$, thì $\delta_{new} < \delta_{old}$. Một ngưỡng $\delta$ thấp hơn làm cho việc tìm kiếm các khối hợp lệ trở nên khó khăn hơn, điều này có tác dụng kéo tốc độ tạo khối chậm lại về gần mức trung bình mười phút. Nếu $t > E(t)$, thì $\delta_{new} > \delta_{old}$, giúp việc tìm khối hợp lệ dễ dàng hơn, và do đó làm tăng tốc độ tạo khối.

Một cách khác để thể hiện sự thay đổi của ngưỡng theo thời gian là thông qua thông số độ khó $D$. Mức độ khó hiện tại $D_i$ có thể được tính bằng cách chia giá trị ngưỡng ban đầu $\delta(B_0)$ (ngưỡng tại thời điểm khối khởi thủy) cho giá trị ngưỡng hiện tại $\delta(B_i)$ (ngưỡng tại thời điểm khối thứ $i$):

$$D_i := rac{\delta(B_0)}{\delta(B_i)}$$

Độ khó phát triển theo hướng hoàn toàn ngược lại với giá trị ngưỡng. Nếu giá trị ngưỡng giảm, việc tìm kiếm khối hợp lệ trở nên khó khăn hơn, và do đó độ khó tăng lên. Hình 5.11 cho thấy công suất tính toán tham gia vào việc khai thác Bitcoin đã tăng lên đáng kể theo thời gian, đặc biệt là sự gia tăng mạnh mẽ của độ khó trong năm 2017 và 2018.

> **Hộp 5.1: Năng lực băm (Hashing Power)**
> Đơn vị liên quan được sử dụng để đo lường hoạt động khai thác là số lượng băm trên giây (hashes per second); nghĩa là có bao nhiêu giá trị băm có thể được tính toán trong một giây. Trong mạng lưới Bitcoin, tổng năng lực băm hiện được đo bằng **Exa-hashes (tỷ tỷ băm - $10^{18}$)** trên giây.
> Sự gia tăng năng lực băm bắt nguồn từ giá trị thị trường cao hơn của Bitcoin và sự tăng trưởng vượt bậc trong hiệu năng của phần cứng khai thác (xem Hộp 5.3). Trong phần 6.4.1, chúng ta sẽ phân tích mức tiêu thụ năng lượng của mạng lưới.

### 5.2.4 Phần thưởng đào và việc tạo ra Bitcoin (Mining Reward and Bitcoin Creation)

Bằng chứng công việc áp đặt chi phí lên các nút khi tạo khối. Đây là một quyết định thiết kế có tính toán và hoàn toàn không thể thiếu để hệ thống hoạt động. Cụ thể, quá trình khai thác bảo vệ mạng lưới Bitcoin. Bằng cách bảo vệ mạng lưới, các thợ đào cung cấp một **hàng hóa công cộng (public good)** vì các lợi ích của nó là không loại trừ (non-excludable) và không cạnh tranh (non-rivalrous).

Chi phí khai thác do các thợ đào gánh chịu riêng lẻ trong khi lợi ích của việc khai thác được cung cấp cho toàn bộ mạng lưới. Điều này đặt ra câu hỏi tại sao một cá nhân lý trí lại muốn đảm nhận chức năng khai thác này. Mọi nút đều nên muốn những người khác đầu tư các nguồn lực cần thiết và bản thân mình chỉ việc tận hưởng tiện ích mà không phải đóng góp gì. Câu trả lời cho câu hỏi này nằm ở cơ chế phần thưởng bản địa của hệ thống Bitcoin.

Các nút đầy đủ tạo ra các khối hợp lệ sẽ nhận được các đơn vị Bitcoin mới. Họ sẽ được thưởng tỷ lệ thuận với lượng năng lực băm mà họ đã phân bổ cho hoạt động này. Khoản bồi thường được thanh toán cho các thợ đào bằng cách sử dụng một **giao dịch coinbase (coinbase transaction)**. Giao dịch này không cần tham chiếu đến bất kỳ UTXO nào trước đó. Nó tạo ra các đơn vị Bitcoin mới từ hư không với điều kiện mở khóa do thợ đào tự chọn.

Mỗi khối ứng viên chứa một giao dịch coinbase. Tuy nhiên, giống như bất kỳ giao dịch nào, giao dịch coinbase chỉ có giá trị nếu khối ứng viên được đưa vào phiên bản đồng thuận của chuỗi khối; nếu không, nó hoàn toàn vô giá trị. Hơn nữa, kích thước của phần thưởng được xác định trước, và nếu thợ đào không tuân thủ các quy tắc đồng thuận, khối sẽ bị các nút khác bỏ qua.

Trong khoảng bốn năm đầu tiên, phần thưởng trị giá **50 Bitcoin** cho mỗi khối. Số tiền này sau đó đã được giảm một nửa sau mỗi **210,000 khối** (khoảng bốn năm một lần).
*   Từ khối 0 đến khối 209,999: mỗi giao dịch coinbase mang lại 50 Bitcoin cộng với phí giao dịch.
*   Từ khối 210,000 đến 419,999: phần thưởng giảm xuống còn 25 Bitcoin cộng với phí giao dịch.
*   Từ khối 420,000 đến 629,999: phần thưởng coinbase là 12.5 Bitcoin.
*   Tại thời điểm viết cuốn sách này (giữa năm 2020), đợt halving tiếp theo chuẩn bị diễn ra tại khối 630,000, đưa phần thưởng coinbase giảm xuống còn 6.25 Bitcoin cho mỗi khối.

Giá trị của phần thưởng coinbase sẽ tiếp tục giảm một nửa và hội tụ về 0. Khi đó sẽ không có thêm đơn vị Bitcoin mới nào được tạo ra. Điều này dự kiến sẽ xảy ra vào khoảng năm **2140**, khi đạt đến số lượng đơn vị Bitcoin tối đa là **21 triệu**.

> **Hộp 5.2: Phí giao dịch (Transaction Fees)**
> Thợ đào cũng kiếm được thu nhập từ phí giao dịch liên kết với các giao dịch có trong khối. Phí này được tính bằng tổng tất cả các đầu vào giao dịch trừ đi tổng tất cả các đầu ra giao dịch. Do đó, đây là một loại số dư còn lại không được sử dụng và có thể được xác nhận quyền sở hữu bởi thợ đào tìm ra khối.
> Người khởi tạo giao dịch tự nguyện thêm phí giao dịch để khuyến khích thợ đào đưa giao dịch của họ vào khối ứng viên. Nói chung, thợ đào luôn ưu tiên các giao dịch trả cho họ mức phí trên mỗi byte cao hơn.
> Khi lượng phần thưởng coinbase giảm dần, phí giao dịch sẽ ngày càng trở nên quan trọng. Phần 6.3.2 sẽ thảo luận sâu về chủ đề này.

### 5.2.5 Phiên bản đồng thuận (The Consensus Version)

Một quy tắc quan trọng để đảm bảo sự đồng thuận vẫn cần được thảo luận. Nếu có hai hoặc nhiều phiên bản chuỗi khối cùng lưu thông, phải có một cơ chế cho phép các nút quyết định phiên bản nào tương ứng với trạng thái thực của chuỗi khối Bitcoin. Để đạt được đồng thuận, tất cả các nút - hoặc ít nhất là phần lớn các nút - phải đồng ý về cùng một kết quả.

Chuỗi khối đồng thuận là chuỗi có **độ khó tích lũy lớn nhất (largest accumulated difficulty)**. Trong phần 2.4.3, chúng đã trình bày tiêu chuẩn này dưới dạng đơn giản hóa là "chuỗi dài nhất" (longest chain). Đây là một sự đơn giản hóa thường dẫn đến cùng một kết quả trong thực tế.

### 5.2.6 Kết nối các điểm mấu chốt (Connecting the Dots)

Sự kết hợp của các quy tắc đồng thuận này sẽ dẫn đến một phiên bản duy nhất thống trị của chuỗi khối Bitcoin. Trong phần này, chúng ta xem xét lại sự tương tác giữa các quy tắc riêng lẻ:

*   **Tính hợp lệ (Legitimacy):** Ngăn chặn các giao dịch không nhất quán và không hợp lệ xâm nhập vào phiên bản đồng thuận của chuỗi khối.
*   **Liên kết (Linking):** Kết nối các khối và đảm bảo các khối phải được tính toán lại sau khi có bất kỳ sự sửa đổi nào trên chuỗi. Điều này áp dụng cho khối bị sửa đổi và tất cả các khối tiếp theo.
*   **Bằng chứng công việc (Proof of work):** Làm cho việc tạo ra các khối hợp lệ trở nên khó khăn. Nếu một chuỗi bị sửa đổi, nó chỉ có thể được xây dựng lại bằng cách sử dụng các tài nguyên tính toán khổng lồ.
*   **Giá trị ngưỡng (Threshold value):** Giá trị ngưỡng biến đổi đảm bảo rằng tốc độ tạo khối được duy trì ổn định ở mức trung bình mười phút, bất kể lượng năng lực băm tham gia vào hoạt động đào là bao nhiêu.
*   **Phần thưởng (Rewards):** Khuyến khích các nút cung cấp năng lực băm và sử dụng nó để duy trì phiên bản đồng thuận của chuỗi khối.
*   **Độ khó tích lũy (Aggregated difficulty):** Tiêu chuẩn này phục vụ để đảm bảo rằng, khi có các phiên bản chuỗi khối mâu thuẫn nhau, phiên bản đã nhận được nhiều công sức tính toán nhất sẽ được coi là phiên bản đồng thuận.

---

## 5.3 Đào Bitcoin: Khuyến khích kinh tế và các ví dụ (Bitcoin Mining: Incentives and Examples)

Trong phần này, chúng ta xem xét sự phân bổ năng lực băm và kiểm tra tính tương thích khuyến khích của một số phần trong quy tắc đồng thuận. Cụ thể, chúng ta đánh giá liệu một hành vi lệch lạc khỏi quy tắc đồng thuận có thể dẫn đến mức chi trả cao hơn hay không, và chúng ta xem xét các vector tấn công khác nhau.

### 5.3.1 Kinh tế học về phân bổ năng lực băm (The Economics of Allocating Hashing Power)

Lượng năng lực băm mà một nút cung cấp phụ thuộc vào cấu trúc chi phí của nó và giá trị hiện tại của phần thưởng kỳ vọng. Chi phí chủ yếu được xác định bởi hiệu năng của phần cứng có sẵn và chi phí vận hành như bảo trì, điện và làm mát. Các thành phần này xác định chi phí biên (marginal cost) cho việc tính toán một số lượng giá trị băm nhất định.

Phần thưởng được chi trả bằng các đơn vị Bitcoin. Do đó, động lực để đào phụ thuộc trực tiếp vào giá trị thị trường của Bitcoin. Xác suất nhận được phần thưởng phụ thuộc vào năng lực băm của thợ đào đó so với tổng năng lực băm của toàn bộ mạng lưới.

Thị trường khai thác cực kỳ cạnh tranh và rào cản gia nhập là rất thấp. Nếu chi phí là đồng nhất (homogeneous), năng lực băm bổ sung sẽ tiếp tục chảy vào thị trường cho đến khi doanh thu biên kỳ vọng (expected marginal revenue) từ năng lực băm bổ sung tương ứng với chi phí biên để cung cấp nó.

Doanh thu biên kỳ vọng của việc tính toán một giá trị băm là giảm dần theo tổng năng lực băm của mạng lưới. Lý do là vì sự gia tăng tổng năng lực băm của mạng lưới cũng làm tăng độ khó, và do đó làm giảm xác suất tìm thấy một khối hợp lệ của một đơn vị năng lực băm cố định. Doanh thu biên giảm dần này được thể hiện trong Hình 5.12, nơi nó giao với đường chi phí biên.

Chi phí cố định (fixed costs), chẳng hạn như chi phí mua sắm phần cứng, đóng vai trò trong việc gia nhập hoặc rút lui khỏi thị trường và hành vi dài hạn của thị trường khai thác. Tuy nhiên, một khi thợ đào đã sở hữu phần cứng, các chi phí này có thể được bỏ qua. Do đó, trong ngắn hạn, biến số duy nhất có liên quan đến việc phân bổ năng lực băm là tỷ lệ giữa doanh thu biên kỳ vọng từ việc tính toán giá trị băm so với chi phí biên của việc đó.

*   Nếu tỷ lệ này lớn hơn 1: năng lực băm bổ sung sẽ được đưa vào vận hành cho đến khi tỷ lệ này trở lại mức 1. Năng lực băm mới thường được chuyển hướng từ việc đào các chuỗi khối khác (Hình 5.13a).
*   Nếu tỷ lệ này nhỏ hơn 1: các thợ đào sẽ chịu thua lỗ. Công suất tính toán sẽ rút khỏi mạng lưới và được sử dụng ở nơi khác cho đến khi tỷ lệ này quay trở lại mức 1 (Hình 5.13b).

> **Hộp 5.3: Phần cứng đào hiệu năng cao (Efficient Mining Hardware)**
> Hiệu năng của phần cứng khai thác đã tăng lên một cách kinh ngạc qua các năm. Trong thời kỳ đầu, việc khai thác được thực hiện hoàn toàn bằng cách sử dụng bộ vi xử lý trung tâm (**CPU**) của máy tính. Sau đó, các thợ đào đã chuyển sang sử dụng bộ xử lý đồ họa (**GPU**) hiệu quả hơn, tiếp theo là các mạch tích hợp lập trình được (**FPGA**). Từ năm 2013 đến nay, thị trường bị thống trị hoàn toàn bởi các mạch tích hợp chuyên dụng (**ASIC**). ASIC là các chip silicon được thiết kế riêng cho một nhiệm vụ duy nhất: tính toán các giá trị băm SHA256d với tốc độ tối đa và mức tiêu thụ điện năng tối thiểu.
> Việc cải thiện hiệu năng của phần cứng không làm giảm chi phí duy trì mạng lưới. Nó chỉ làm tăng tổng lượng năng lực băm của mạng lưới, vì một tỷ lệ độ khó cao hơn sẽ bù đắp cho mức năng lực băm cao hơn này.

### 5.3.2 Phân bổ năng lực băm và các mỏ đào (Allocation of Hashing Power and Mining Pools)

Chúng ta xem xét sự phân bổ năng lực băm và khai thác theo mỏ (pool mining) thông qua một ví dụ. Giả sử tổng năng lực băm của toàn mạng là **16 đơn vị** và được phân bổ cố định như trong Hình 5.14. Xác suất để một nút có thể tạo ra khối tiếp theo tương ứng chính xác với số đơn vị năng lực băm của nó chia cho tổng số 16 đơn vị:

*   Edith vận hành một nút đầy đủ nhưng không đào. Cô có xác suất tìm thấy khối bằng 0% nhưng vẫn có khả năng tự mình kiểm tra tính hợp lệ của mọi khối và giao dịch.
*   Michèle có năng lực băm là 4 đơn vị, do đó có 25% cơ hội ($4/16$) tạo ra khối hợp lệ tiếp theo.
*   12 đơn vị năng lực băm còn lại được chia cho các thành viên khác.

Một thợ đào đơn lẻ (solo miner) không bao giờ biết trước liệu khi nào mình sẽ nhận được phần thưởng khối. Mô hình thanh toán này tương tự như một trò chơi xổ số và năng lực băm tương đương với số lượng vé số mà thợ đào nắm giữ.

Để giải quyết vấn đề biến động thu nhập (payout volatility) và làm mượt nguồn thu của mình, các thợ đào có khả năng thành lập các **mỏ đào (mining pools)**. Các mỏ đào này hợp nhất năng lực băm của các thành viên và hoạt động như một nhóm duy nhất. Năng lực băm kết hợp dẫn đến phần thưởng thường xuyên hơn, phần thưởng này sau đó có thể được phân phối theo tỷ lệ đóng góp (pro rata) cho tất cả các thành viên của mỏ. Giá trị phần thưởng kỳ vọng là không đổi, nhưng độ lệch chuẩn (biến động) của phần thưởng giảm đi đáng kể.

Trong ví dụ ở Hình 5.14, Brian, Jake, và Claudia hoạt động như những thợ đào độc lập. Mỗi người kiểm soát $1/16$ tổng năng lực băm và với phần thưởng khối $12.5 	ext{ BTC}$, kỳ vọng nhận được $12.5/16 	ext{ BTC}$ sau mỗi 10 phút. Các khoản thanh toán khả dĩ là $0$ (với xác suất $15/16$) và $12.5 	ext{ BTC}$ (với xác suất $1/16$), dẫn đến độ lệch chuẩn rất cao là $3.125$.

Trong Hình 5.15, ba cá nhân quyết định thành lập một mỏ đào (Brian's mining pool) kiểm soát tổng cộng 3 đơn vị năng lực băm. Độ lệch chuẩn của phần thưởng lúc này giảm đáng kể xuống còn $1.63$ vì các thành viên mỏ nhận được phần thưởng tỷ lệ thuận là $12.5/3 	ext{ BTC}$ trong $3/10$ số trường hợp khả dĩ. Giá trị kỳ vọng không bị ảnh hưởng bởi liên minh của họ, điều này có thể được minh họa bằng phương trình đơn giản cân bằng giữa đào đơn lẻ và đào theo mỏ:

$$12.5 \cdot rac{1}{16} = 12.5 \cdot rac{3}{16} \cdot rac{1}{3}$$

Nếu năng lực băm của một thợ đào là $h$, tổng năng lực băm của mạng lưới là $H$, và phần thưởng khối hiện tại là $R$, thì giá trị kỳ vọng cá nhân của phần thưởng sẽ không bị ảnh hưởng bởi tổng lượng năng lực băm của mỏ đào $P$:

$$R \cdot rac{h}{H} = R \cdot rac{P}{H} \cdot rac{h}{P}$$

Trong thực tế, một thợ đào đơn lẻ có thể phải đợi hàng tháng hoặc hàng năm để tự mình tạo ra một khối hợp lệ và nhận thanh toán. Đây là lý do tại sao các mỏ đào vô cùng phổ biến và đóng một vai trò quan trọng trong mạng lưới Bitcoin.

Tuy nhiên, các mỏ đào là một trong những yếu tố dẫn đến sự **tập trung hóa âm thầm (creeping centralization)** trong hệ thống Bitcoin. Nếu phần lớn năng lực băm của mạng lưới tập trung vào một vài thực thể, việc ghi chép sổ cái sẽ bị tập trung hóa phần nào, làm cho mạng lưới dễ bị tổn thương hơn. Ngoài ra, các thợ đào kết nối với một mỏ thường không tự vận hành một nút đầy đủ. Họ kết nối với máy chủ của mỏ qua một mạng con tập trung và chỉ nhận thông tin liên quan đến việc tính toán giá trị băm từ quản lý mỏ. Những thợ đào này thường được gọi là các **hashers (nút băm)** để biểu thị thực tế rằng họ chỉ tính toán các giá trị băm theo yêu cầu của bên khác mà không tự mình lắp ráp các khối ứng viên.

Trong ví dụ ở Hình 5.15, điều này áp dụng cho Jake và Claudia. Sau khi tham gia mỏ của Brian, họ đã từ bỏ trạng thái nút đầy đủ của mình và chỉ tính toán băm theo yêu cầu của Brian. Mạng lưới đột ngột mất đi hai nút đầy đủ và xuất hiện một nhà vận hành mỏ lớn kiểm soát gần 20% năng lực băm toàn mạng.

### 5.3.3 Sự chấp nhận khối của người tham gia khác (Acceptance of Other Participants' Blocks)

Sau một thời gian, Michèle tạo ra một khối hợp lệ nằm dưới giá trị ngưỡng và đáp ứng mọi quy tắc đồng thuận. Khối này sẽ được các nút khác chấp nhận và đưa vào bản sao cục bộ của họ.

Tuy nhiên, Brian có phần do dự. Anh ta muốn giành được phần thưởng khối cho mỏ đào của mình hơn và nảy ra ý định vi phạm quy tắc đồng thuận bằng cách không chấp nhận khối hợp lệ của Michèle. Nếu mỏ đào của anh ta có thể tạo ra một khối khác dựa trên khối tiền nhiệm (Khối 3), mỏ của anh ta sẽ có cơ hội tranh chấp phần thưởng khối của Michèle.

Tình huống này được minh họa trong Hình 5.16. Để mỏ của Brian có thể vượt qua phiên bản chuỗi của Michèle, họ sẽ phải tạo ra liên tiếp hai khối hợp lệ mới. Trong khi đó, phần còn lại của mạng lưới sẽ tiếp tục đào trên đỉnh khối của Michèle.

Vì mỏ của Brian chỉ kiểm soát 3 đơn vị năng lực băm, xác suất để mỏ tạo ra một khối tiếp theo là $3/16$. Xác suất để điều này xảy ra hai lần liên tiếp là:

$$rac{3}{16} \cdot rac{3}{16} = rac{9}{256}$$

Nếu họ thành công, chuỗi thay thế gồm hai khối của họ sẽ vượt qua chuỗi một khối của Michèle và trở thành chuỗi đồng thuận mới, mang về cho mỏ của Brian phần thưởng khối là $25 	ext{ BTC}$ ($2 	imes 12.5$). Trong tất cả các trường hợp khác (với xác suất bổ sung là $247/256$), các thợ đào trung thực khác sẽ tìm thấy ít nhất một khối mới trên chuỗi của Michèle, làm cho nỗ lực của Brian thất bại hoàn toàn và thu nhập của Brian bằng 0.

Giá trị kỳ vọng của khoản chi trả cho Brian khi thực hiện hành vi lệch lạc này là:

$$25 \cdot rac{9}{256} + 0 \cdot rac{247}{256} pprox 0.88 	ext{ BTC}$$

Để so sánh, nếu Brian tuân thủ quy tắc đồng thuận, chấp nhận khối của Michèle và đào trên đỉnh khối đó, các cơ hội phát triển của chuỗi được thể hiện trong Hình 5.17. Bằng cách hợp tác, mỏ đào của Brian không có rủi ro bị mất các khối đã tìm thấy trước đó. Trong khoảng thời gian tạo ra hai khối tiếp theo (khoảng 20 phút), mỏ của Brian có hai cơ hội độc lập (mỗi cơ hội có xác suất $3/16$) để tìm khối. Giá trị kỳ vọng thu về khi hành xử trung thực là:

$$0 \cdot rac{169}{256} + 12.5 \cdot rac{39}{256} + 12.5 \cdot rac{39}{256} + 25 \cdot rac{9}{256} pprox 4.69 	ext{ BTC}$$

Ví dụ này minh họa động lực hợp tác cực kỳ mạnh mẽ đối với các thợ đào. **Giá trị kỳ vọng khi tuân thủ quy tắc đồng thuận ($4.69 	ext{ BTC}$) cao hơn gấp nhiều lần so với khi cố tình gian lận ($0.88 	ext{ BTC}$)**. Do đó, việc chấp nhận các khối hợp lệ của người khác và luôn cập nhật bản sao chuỗi khối của mình là chiến lược tối ưu nhất cho lợi ích kinh tế của các thợ đào.

### 5.3.4 Cuộc đua khối (Block Race)

Vì khai thác là một quy trình mang tính xác suất, có khả năng hai khối ứng viên hợp lệ cùng được tìm thấy gần như đồng thời bởi hai thợ đào khác nhau. Cả hai khối này đều tham chiếu đến cùng một khối cha và tạo ra hai nhánh chuỗi tạm thời cạnh tranh nhau.

Giả sử cả Michèle và Tony cùng tìm thấy một khối hợp lệ tham chiếu đến Khối 3, tạo ra tình huống như trong Hình 5.18. Quy tắc đồng thuận về chuỗi dài nhất (độ khó tích lũy lớn nhất) lúc này chưa thể giải quyết ngay lập tức vì cả hai nhánh chuỗi có độ dài và độ khó tích lũy hoàn toàn bằng nhau. Hai nhánh chuỗi này sẽ cùng tồn tại song song trong một khoảng thời gian ngắn. Chỉ khi một trong hai nhánh được mở rộng trước bằng một khối hợp lệ mới, nhánh chuỗi đó sẽ bứt lên và thiết lập vị thế đồng thuận, khiến nhánh chuỗi còn lại trở nên lỗi thời (gọi là khối bị mồ côi - orphan block). Kịch bản này được gọi là **cuộc đua khối (block race)**.

Sự phân bổ năng lực băm trong mạng lưới sẽ quyết định kết quả của cuộc đua. Nhánh chuỗi nào thu hút được nhiều thợ đào và năng lực băm hơn sẽ có xác suất được mở rộng trước cao hơn. Theo mặc định, các thợ đào khác trong mạng lưới sẽ chọn làm việc trên khối nào mà họ nhận được trước tiên qua đường truyền mạng.

Đối với Michèle và Tony, kết quả cuộc đua là vô cùng quan trọng vì phần thưởng khối chỉ tồn tại trên nhánh chuỗi chiến thắng. Thợ đào bị thua cuộc sẽ mất hoàn toàn phần thưởng khối của mình. Trong trường hợp này, thợ đào bị thua cuộc (ví dụ là Tony) có thể nảy sinh động lực tiếp tục đào trên nhánh chuỗi của mình thay vì chuyển sang nhánh của Michèle, nhằm cố gắng tạo liên tiếp hai khối mới để đảo ngược tình thế và cứu vớt phần thưởng khối của mình.

Nếu Tony tuân thủ quy tắc và chuyển sang nhánh của Michèle, anh ta sẽ mất phần thưởng khối hiện tại nhưng sẽ có cơ hội đào các khối tiếp theo trên chuỗi đồng thuận mới với giá trị kỳ vọng là khoảng $4.69 	ext{ BTC}$.

Nếu Tony quyết định đào tiếp trên chuỗi của mình, anh ta chỉ thành công nếu tự mình tạo ra liên tiếp hai khối tiếp theo. Khoản chi trả kỳ vọng của hành vi lệch lạc này là:

$$3 \cdot \left(rac{h}{H}ight)^2 \cdot R pprox 3 \cdot \left(rac{3}{16}ight)^2 \cdot 12.5 pprox 1.32 	ext{ BTC}$$

Mặc dù có thêm động lực cứu vớt phần thưởng khối cũ ($3 	imes R$ thay vì $2 	imes R$), Tony vẫn có giá trị kỳ vọng thấp hơn nhiều khi cố tình lệch lạc ($1.32 < 4.69$). Chúng ta có thể tính toán tỷ lệ năng lực băm tối thiểu $h/H$ để hành vi lệch lạc này bắt đầu có lợi nhuận bằng cách giải phương trình bất đẳng thức:

$$3 \cdot \left(rac{h}{H}ight)^2 \cdot R \ge 2 \cdot rac{h}{H} \cdot R \implies rac{h}{H} \ge rac{2}{3}$$

Như vậy, **chỉ khi kiểm soát ít nhất $2/3$ (khoảng 66.7%) tổng năng lực băm toàn mạng**, thợ đào mới có lợi thế kinh tế để tiếp tục làm việc trên nhánh chuỗi thua cuộc của mình. Với bất kỳ tỷ lệ năng lực băm nào nhỏ hơn $2/3$, việc tuân thủ quy tắc đồng thuận luôn mang lại lợi nhuận biên lớn hơn.

Nếu thợ đào có tầm nhìn dài hạn hơn và sẵn sàng đào trên chuỗi riêng của mình bất kể mạng lưới di chuyển đi xa thế nào, bài toán sẽ trở nên phức tạp hơn. Tuy nhiên, về mặt lý thuyết, bất kỳ thợ đào nào kiểm soát hơn **50%** năng lực băm toàn mạng đều có thể duy trì chuỗi riêng của họ mãi mãi vì chuỗi của họ có tốc độ tăng trưởng trung bình nhanh hơn bất kỳ chuỗi của phần còn lại của mạng lưới. Sự thống trị này tạo ra mối đe dọa lớn đối với mạng lưới Bitcoin.

> **Hộp 5.4: Tấn công Goldfinger (Goldfinger Attacks)**
> Nếu một thợ đào muốn tối đa hóa thu nhập từ phần thưởng của hệ thống, họ thường sẽ không lệch lạc khỏi giao thức. Tuy nhiên, có thể có những động cơ phi kinh tế khác khiến thợ đào muốn phá hoại hệ thống. Chẳng hạn, một quốc gia hoặc thế lực đối địch có thể muốn phá hủy hoàn toàn niềm tin vào Bitcoin.
> Kiểu tấn công phá hoại này được gọi là **tấn công Goldfinger**. Trong cuộc tấn công này, kẻ tấn công sẵn sàng gánh chịu tổn thất tài chính khổng lồ từ chi phí năng lượng và phần cứng, chỉ nhằm mục đích làm gián đoạn mạng lưới, thực hiện các giao dịch gian lận liên tục và khiến hệ thống sụp đổ. Sự tăng trưởng mạnh mẽ của tổng năng lực băm mạng lưới và giá trị vốn hóa thị trường làm cho các cuộc tấn công kiểu này ngày càng trở nên đắt đỏ và ít khả thi hơn.

### 5.3.5 Các cuộc tấn công vào hệ thống (Attacks on the System)

Các thợ đào kiểm soát lượng lớn năng lực băm có khả năng định hình sự phát triển của chuỗi đồng thuận. Chẳng hạn, nếu một thợ đào từ chối đưa một giao dịch cụ thể vào khối của mình, điều này sẽ kéo dài thời gian chờ xác nhận của giao dịch đó. Năng lực băm của thợ đào này càng lớn, giao dịch đó càng khó được xác nhận trong tương lai gần.

Nếu thợ đào này muốn ngăn chặn hoàn toàn một giao dịch, anh ta phải có năng lực băm cực lớn để có thể thực hiện một cuộc tấn công tổ chức lại chuỗi (reorganization). Khi một thợ đào trung thực khác tìm thấy khối chứa giao dịch đó, kẻ tấn công phải xây dựng một chuỗi thay thế bắt đầu từ khối cha của khối đó và cố gắng vượt qua chuỗi trung thực (Hình 5.20).

Khối càng nhận được nhiều xác nhận (độ sâu khối lớn), việc thực hiện cuộc tấn công tổ chức lại chuỗi càng trở nên khó khăn. Đối với hầu hết các giao dịch, **2 đến 3 xác nhận** là đủ an toàn. Một khối có **hơn 6 xác nhận** được coi là hoàn toàn không thể đảo ngược (irreversible).

Việc đảo ngược giao dịch cực kỳ tốn kém và không thể duy trì lâu dài vì người nhận (như Lucas) có thể đơn giản là truyền phát lại giao dịch cũ lên mạng lưới, và cuối cùng nó sẽ được đưa vào khối bởi một thợ đào trung thực khác nhờ vào sự khuyến khích của phí giao dịch.

Tuy nhiên, nếu người gửi (như Raphael) cố tình thực hiện hành vi gian lận sau khi đã nhận được hàng hóa từ người bán, anh ta có thể tạo ra một giao dịch cạnh tranh sử dụng cùng đầu ra UTXO nhưng chuyển tiền về địa chỉ của chính mình (Hình 5.21). Nếu chuỗi thay thế chứa giao dịch chuyển tiền về cho chính mình chiến thắng cuộc đua, giao dịch gửi cho người bán sẽ trở nên không hợp lệ. Kiểu tấn công này được gọi là **Tấn công 51% (51 percent attacks)** vì nó yêu cầu kẻ tấn công kiểm soát phần lớn năng lực băm để đảm bảo xác suất thành công cao, mặc dù trên thực tế xác suất thành công vẫn tồn tại với tỷ lệ năng lực băm thấp hơn 50%.

> **Hộp 5.5: Cơ hội hạn chế cho các cuộc tấn công 51%**
> Ngay cả khi một cuộc tấn công 51% thành công, khả năng của kẻ tấn công là vô cùng hạn chế. Kẻ tấn công không bao giờ có thể tự tạo ra một giao dịch thay mặt cho người khác hoặc tịch thu Bitcoin của địa chỉ mà họ không nắm giữ khóa riêng tư. Tất cả các đầu ra giao dịch luôn được bảo vệ nghiêm ngặt bởi các tập lệnh khóa mật mã.
> Một cuộc tấn công 51% tệ nhất chỉ có thể đảo ngược các giao dịch gần đây của chính kẻ tấn công (thực hiện chi tiêu kép) hoặc ngăn chặn một số giao dịch nhất định được xác nhận. Bằng cách áp dụng các biện pháp phòng ngừa đơn giản (chờ đủ số lượng xác nhận khối), các cuộc tấn công kiểu này hoàn toàn có thể phòng tránh được. Hơn nữa, những thợ đào có quy mô lớn như vậy thường có lợi ích kinh tế gắn liền với sự tồn tại và uy tín của mạng lưới Bitcoin, vì vậy họ không có động lực phá hủy nguồn thu nhập chính của mình.

#### Tấn công chi tiêu kép không cần năng lực băm (Double Spend without Hashing Power)

Người mua có thể thực hiện cuộc tấn công này đối với các cửa hàng chấp nhận thanh toán tức thời không chờ xác nhận khối (giao dịch 0-confirmation), chẳng hạn như mua một ly cà phê tại cửa hàng của Daniel.

Raphael tạo ra hai giao dịch đồng thời sử dụng cùng một UTXO:
*   Giao dịch thứ nhất: Chuyển tiền cho Daniel để thanh toán ly cà phê.
*   Giao dịch thứ hai: Chuyển tiền về địa chỉ ví của chính mình.

Raphael gửi giao dịch thứ nhất đến một nút mạng gần Daniel (để Daniel thấy giao dịch xuất hiện trong ví và giao hàng), đồng thời gửi giao dịch thứ hai đến một nút mạng khác để nó nhanh chóng lan truyền đến các thợ đào.

Hình 5.22 minh họa quy trình lan truyền cạnh tranh này. Các nút nhận được giao dịch nào trước sẽ lưu trữ nó trong mempool và bỏ qua giao dịch thứ hai đến sau. Kết quả là mạng lưới bị chia rẽ. Nếu phần lớn các thợ đào nhận được giao dịch thứ hai của Raphael trước và lưu giữ nó trong mempool của họ, xác suất để giao dịch của Raphael chiến thắng và được đưa vào khối tiếp theo là rất cao (trong ví dụ ở Hình 5.22, xác suất thành công của Raphael lên tới **13/16**). Daniel sẽ mất ly cà phê mà không nhận được tiền. Do đó, đối với bất kỳ giao dịch có giá trị nào, người nhận luôn được khuyến cáo chờ ít nhất **một xác nhận khối** trước khi hoàn thành giao dịch.

---

## 5.4 Bài tập thực hành (Exercises)

### Bài tập 5.1
Vẽ một khối và chỉ ra các thành phần quan trọng nhất của nó. Thêm một khối thứ hai vào bản vẽ và giải thích cách cấu trúc chuỗi có thể phát triển từ các khối này.
*   **Gợi ý lời giải:** Khối gồm hai phần chính: Tiêu đề khối (Block Header) và Danh sách giao dịch (Transactions). Khối thứ hai liên kết với khối thứ nhất bằng cách đưa giá trị băm tiêu đề của khối thứ nhất vào trường tham chiếu (Reference) trong tiêu đề của chính nó.

### Bài tập 5.2
Mô tả nguyên lý tham chiếu của Bitcoin liên quan đến các giá trị băm tiêu đề khối (số nhận diện). Làm thế nào các khối có thể được bảo mật bằng nguyên lý này?
*   **Gợi ý lời giải:** Do đặc tính nhạy cảm của hàm băm mật mã, bất kỳ thay đổi nào dù là nhỏ nhất trong nội dung của một khối (hoặc trường tham chiếu khối cha) sẽ làm thay đổi hoàn toàn giá trị băm tiêu đề của khối đó, từ đó làm đứt gãy liên kết tham chiếu của tất cả các khối tiếp theo. Để sửa đổi một khối trong quá khứ, kẻ tấn công buộc phải tính toán lại toàn bộ các khối phía sau, điều này đòi hỏi một năng lực băm khổng lồ.

### Bài tập 5.3
Liệt kê các thành phần quan trọng nhất của giao thức đồng thuận Bitcoin và cách chúng tương tác để đảm bảo sự đồng thuận.
*   **Gợi ý lời giải:** Các thành phần bao gồm: (1) Tính hợp lệ của giao dịch, (2) Liên kết chuỗi khối, (3) Cơ chế Bằng chứng công việc (PoW), (4) Giá trị ngưỡng động, (5) Phân thưởng khối và (6) Quy tắc độ khó tích lũy lớn nhất. Chúng tạo ra một hệ thống tự thực thi bằng cách làm cho hành vi gian lận trở nên cực kỳ đắt đỏ và vô ích, trong khi hành vi trung thực được tưởng thưởng rõ ràng.

### Bài tập 5.4
Giải thích khái niệm giá trị ngưỡng (threshold) trong bối cảnh của bằng chứng công việc. Tại sao hệ thống Bitcoin sử dụng ngưỡng động, và ngưỡng này được thiết lập như thế nào?
*   **Gợi ý lời giải:** Ngưỡng là giới hạn tối đa mà giá trị băm tiêu đề khối phải đạt được để khối đó được coi là hợp lệ. Ngưỡng động được sử dụng để duy trì thời gian tạo khối trung bình ổn định là 10 phút, tự động điều chỉnh sau mỗi 2,016 khối dựa trên tổng năng lực băm thực tế của toàn mạng lưới theo công thức điều chỉnh ngưỡng.

### Bài tập 5.5
Giả sử rằng một đơn vị năng lực băm có chi phí vận hành là 0.6 đơn vị tiền tệ mỗi giờ. Cũng giả sử rằng chuỗi khối được bảo mật bởi 2,000 đơn vị năng lực băm trong trạng thái cân bằng thị trường cạnh tranh và phần thưởng khối hiện tại là 12.5 Bitcoin. Theo các giả định này, một đơn vị Bitcoin phải có giá bao nhiêu đơn vị tiền tệ?
*   **Gợi ý lời giải:**
    Trong trạng thái cân bằng cạnh tranh dài hạn, Doanh thu biên bằng Chi phí biên ($MR = MC$).
    *   Tổng chi phí vận hành mạng lưới mỗi giờ:
        $$	ext{Chi phí} = 2,000 	ext{ đơn vị} 	imes 0.6 	ext{ đơn vị tiền tệ/giờ} = 1,200 	ext{ đơn vị tiền tệ/giờ}$$
    *   Số lượng khối được tạo ra trung bình mỗi giờ (10 phút/khối):
        $$	ext{Số khối} = 6 	ext{ khối/giờ}$$
    *   Tổng số Bitcoin được tạo ra mỗi giờ:
        $$	ext{Số BTC} = 6 	ext{ khối} 	imes 12.5 	ext{ BTC/khối} = 75 	ext{ BTC/giờ}$$
    *   Do đó, tại điểm cân bằng cạnh tranh:
        $$	ext{Giá của 1 BTC} = rac{	ext{Chi phí mỗi giờ}}{	ext{Số BTC mỗi giờ}} = rac{1,200 	ext{ đơn vị tiền tệ}}{75 	ext{ BTC}} = 16 	ext{ đơn vị tiền tệ/BTC}$$

### Bài tập 5.6
Thảo luận điều gì sẽ thay đổi trong Bài tập 5.5 nếu phần cứng đào với hiệu năng tăng 500% đột ngột có thể được mua trên thị trường. Hãy biện minh cho giải thích của bạn.
*   **Gợi ý lời giải:**
    *   Trong ngắn hạn, khi hiệu năng tăng 500% mà chi phí năng lượng giữ nguyên, các thợ đào sử dụng phần cứng mới sẽ có lợi nhuận biên lớn hơn 1. Điều này thu hút thêm năng lực băm gia nhập mạng lưới.
    *   Trong dài hạn, hệ thống sẽ tự động hiệu chuẩn lại độ khó khai thác sau 2,016 khối để đưa tốc độ tạo khối trung bình về lại mức 10 phút.
    *   Tại điểm cân bằng mới, tổng số BTC được tạo ra mỗi giờ vẫn là 75 BTC. Nếu cấu trúc chi phí vận hành của toàn mạng lưới vẫn giữ nguyên ở mức 1,200 đơn vị tiền tệ/giờ (do các thợ đào cạnh tranh đào đến điểm hòa vốn), giá Bitcoin tại điểm cân bằng dài hạn **vẫn không thay đổi** ở mức 16 đơn vị tiền tệ/BTC. Sự thay đổi duy nhất là tổng năng lực băm của mạng lưới lúc này đã tăng gấp 5 lần, giúp mạng lưới an toàn hơn trước các cuộc tấn công nhưng không làm thay đổi giá trị kinh tế của Bitcoin.

### Bài tập 5.7
Giải thích vai trò của độ sâu khối trong việc đảm bảo an toàn cho các giao dịch có trong khối đó.
*   **Gợi ý lời giải:** Độ sâu khối thể hiện số lượng khối kế nhiệm đã được xây dựng đè lên khối đó. Mỗi khối mới được thêm vào chuỗi đòi hỏi một lượng năng lực băm rất lớn. Độ sâu khối càng lớn, số lượng công việc tính toán tích lũy cần phải làm lại để đảo ngược khối đó càng khổng lồ, khiến giao dịch càng trở nên an toàn và bất biến.

### Bài tập 5.8
Xác định hai loại tấn công chi tiêu kép (double spend) mà bạn biết, đồng thời chỉ ra sự khác biệt về điều kiện tiên quyết và khả năng của kẻ tấn công trong mỗi loại.
*   **Gợi ý lời giải:**
    1.  **Tấn công 51% (hoặc tấn công tổ chức lại chuỗi):** Đảo ngược các giao dịch đã được xác nhận. Điều kiện tiên quyết là kẻ tấn công phải kiểm soát một tỷ lệ năng lực băm lớn của mạng lưới (lý tưởng là >50%). Khả năng của kẻ tấn công là rất lớn, có thể đảo ngược các giao dịch đã được xác nhận nhiều khối trước đó.
    2.  **Tấn công chi tiêu kép trên giao dịch chưa xác nhận (0-confirmation double spend):** Đánh lừa người bán chấp nhận thanh toán tức thời. Không đòi hỏi năng lực băm. Kẻ tấn công chỉ cần truyền phát đồng thời hai giao dịch mâu thuẫn nhau lên mạng lưới và lợi dụng cấu trúc mạng để giao dịch gian lận được thợ đào xác nhận trước. Khả năng thành công phụ thuộc vào may rủi và tốc độ kết nối mạng, hoàn toàn có thể phòng ngừa bằng cách chờ xác nhận khối.

### Bài tập 5.9
Hãy xem xét ví dụ trong Hình 5.22. Xác suất Raphael hoàn thành thành công cuộc tấn công chi tiêu kép là bao nhiêu nếu anh ta truyền phát giao dịch thứ hai đến Marcia thay vì Michèle?
*   **Gợi ý lời giải:**
    *   Nếu Raphael gửi giao dịch thứ hai (gian lận) cho Marcia thay vì Michèle:
        *   Hãy nhìn vào sơ đồ phân bổ năng lực băm của mạng lưới (Hình 5.22d):
            *   Edith: 0
            *   Tamara: 3
            *   Tony: 3
            *   Marcia: 3
            *   Brian's Pool: 3
            *   Michèle: 4
        *   Nếu Raphael gửi giao dịch thứ hai cho Marcia: Giao dịch này sẽ lan truyền qua Marcia (3), Brian's Pool (3), và các nút lân cận.
        *   Chúng ta cần tính toán chính xác tỷ lệ năng lực băm sẽ chấp nhận giao dịch thứ hai (chuyển tiền cho chính Raphael) dựa trên tốc độ lan truyền từng bước qua mạng lưới:
            *   Raphael gửi giao dịch 1 (hợp lệ - cho Daniel) tới Tamara. Tamara (3) nhận được giao dịch 1.
            *   Raphael gửi giao dịch 2 (gian lận) tới Marcia. Marcia (3) nhận được giao dịch 2.
            *   Tại Bước 1:
                *   Tamara chuyển giao dịch 1 tới Edith (0) và Tony (3). Edith và Tony nhận giao dịch 1.
                *   Marcia chuyển giao dịch 2 tới Tony và Brian's Pool (3). Tony đã có giao dịch 1 từ Tamara nên bỏ qua giao dịch 2. Brian's Pool nhận giao dịch 2.
                *   Giao dịch 2 cũng được gửi trực tiếp tới Michèle (4) từ phía Raphael hoặc lan truyền từ các nút khác. Nếu Raphael gửi cho Marcia thay vì Michèle, Michèle sẽ nhận được giao dịch nào? Michèle kết nối với Tony, Edith, và Brian's Pool.
                    *   Tony (đang giữ giao dịch 1) sẽ chuyển giao dịch 1 cho Michèle.
                    *   Brian's Pool (đang giữ giao dịch 2) sẽ chuyển giao dịch 2 cho Michèle.
                    *   Tùy thuộc vào tốc độ truyền tin, Michèle có thể nhận được giao dịch 1 hoặc 2. Trong mô hình đơn giản hóa này, nếu chúng ta tính toán số lượng nút băm bị chiếm lĩnh bởi giao dịch 2:
                        *   Các nút chắc chắn giữ giao dịch 1 (hợp lệ): Tamara (3), Tony (3). Tổng năng lực băm = 6.
                        *   Các nút chắc chắn giữ giao dịch 2 (gian lận): Marcia (3), Brian's Pool (3). Tổng năng lực băm = 6.
                        *   Michèle (4) nằm ở giữa, nhận được cả hai luồng tin. Nếu Michèle nhận được giao dịch 1, tổng năng lực băm hợp lệ là 10/16 (xác suất Daniel nhận được tiền là 62.5%). Nếu Michèle nhận được giao dịch 2, tổng năng lực băm gian lận là 10/16 (xác suất Raphael thành công là 62.5%).
                        *   So với trường hợp gốc gửi cho Michèle (Michèle trực tiếp giữ giao dịch 2 ngay từ đầu giúp phe gian lận nắm giữ 13/16 năng lực băm), việc gửi cho Marcia làm giảm đáng kể xác suất thành công của cuộc tấn công chi tiêu kép xuống chỉ còn khoảng **37.5% đến 62.5%** tùy thuộc vào tốc độ lan truyền tin tới nút Michèle.
