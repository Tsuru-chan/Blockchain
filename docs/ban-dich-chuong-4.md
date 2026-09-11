# BẢN DỊCH CHƯƠNG 4: TÍNH HỢP LỆ CỦA GIAO DỊCH (TRANSACTIONAL LEGITIMACY)

Trong chương này, chúng ta sẽ xem xét cách thức các đơn vị Bitcoin được gán cho một cá nhân và những nguyên lý toán học nào cho phép xác thực phi tập trung tính hợp lệ của một giao dịch. Chúng ta sẽ giới thiệu khái niệm biệt danh và mở rộng các nền tảng mật mã học cần thiết. Chúng ta cũng trình bày các loại giao dịch khác nhau cũng như các điều kiện cụ thể phải được đáp ứng để các đơn vị Bitcoin được chuyển đi. Cuối cùng, chúng ta sẽ xem xét các loại băm chữ ký (signature hash types) và những thay đổi giao thức gần đây hơn như Segregated Witness (SegWit).

---

## 4.1 Biệt danh (Pseudonyms)

Do cấu trúc phi tập trung của mạng lưới Bitcoin, không thể quản lý số dư Bitcoin và quyền truy cập theo cách truyền thống. Không có cơ quan trung ương chịu trách nhiệm mở tài khoản, ghi lại thông tin cá nhân của chủ sở hữu và ủy quyền truy cập sau đó. Do đó, việc phi tập trung hóa khiến cho việc kiểm tra tính hợp lệ của các yêu cầu sở hữu trở nên cực kỳ khó khăn.

Việc sử dụng danh tính thực dưới dạng tên cá nhân và thông tin cá nhân vừa không khả thi vừa không đáng mong muốn trong hệ thống Bitcoin:
* **Không đáng mong muốn:** Vì nếu các địa chỉ Bitcoin được đăng ký dưới tên cá nhân, người ta có thể liên kết tất cả các giao dịch với các cá nhân đó. Thông tin về thanh toán lương, sở thích mua sắm và tài sản cá nhân sẽ bị tất cả mọi người tiếp cận.
* **Không khả thi:** Vì trong một hệ thống phi tập trung, không thể cung cấp bằng chứng danh tính theo cách tương tự như hệ thống tài chính truyền thống.

Hệ thống Bitcoin sử dụng biệt danh thay cho danh tính thực để đảm bảo tính hợp lệ của giao dịch. Một giải pháp dựa trên biệt danh trong một hệ thống phi tập trung đòi hỏi phải đáp ứng các điều kiện sau:
1. Người tham gia phải có thể tự tạo biệt danh cho riêng mình mà không cần sự trợ giúp của một bên trung ương.
2. Không có hai biệt danh nào trùng lặp nhau.
3. Quyền sở hữu đối với các biệt danh phải có thể kiểm tra một cách công khai để quyền truy cập vào số dư Bitcoin tương ứng bị hạn chế.

Bitcoin đáp ứng các điều kiện này bằng cách sử dụng các cặp khóa mật mã (cryptographic key pairs). Một cặp bao gồm một khóa riêng tư (private key) và một khóa công khai (public key). Khóa công khai (hoặc địa chỉ Bitcoin được phái sinh từ nó) hoạt động như một biệt danh đại diện cho danh tính của người tham gia tương ứng nhưng không thể dễ dàng liên kết với một người [1]. Trong thực tế, số lượng biệt danh lớn đến mức xác suất hai người chọn cùng một biệt danh là không đáng kể [2]. Khóa riêng tư phải luôn nằm trong sự sở hữu độc quyền của người đã tạo ra biệt danh đó và từ đó cung cấp bằng chứng rằng chủ sở hữu của biệt danh tương ứng được ủy quyền để sử dụng nó.

---

### 4.1.1 Tạo một Cặp Khóa (Generating a Key Pair)

Để tạo một cặp khóa, một người phải chọn ngẫu nhiên một phần tử từ một tập hợp số lớn đến mức không tưởng, nằm trong khoảng từ 1 đến:
$$115,792,089,237,316,195,423,570,985,008,687,907,852,837,564,279,074,904,382,605,163,141,518,161,494,336$$
(tức là giữa 1 và một số có 78 chữ số) [2]. Số được chọn đóng vai trò là khóa riêng tư ($k_{prv}$) và sau đó có thể được sử dụng để cung cấp bằng chứng sở hữu.

Khóa công khai được phái sinh từ khóa riêng tư. Nó được phái sinh bằng cách nhân một điểm cơ sở (base point) $G$ đã biết của đường cong elliptic với khóa riêng tư đã chọn trước đó $k_{prv}$ (xem phần 4.3.4). Vì lý do này, khóa công khai là một điểm $K_{pub}$ trên đường cong elliptic được đại diện bởi một giá trị $x$ và một giá trị $y$:
$$K_{pub} = k_{prv} \circ G$$

Điều cực kỳ quan trọng là các phép nhân dựa trên đường cong elliptic không thể bị đảo ngược [3]. Nếu không, bất kỳ ai biết biệt danh đều có thể phái sinh ra quyền truy cập tương ứng dưới dạng khóa riêng tư.

Nhờ có hàm một chiều (one-way function), mọi người có thể tiết lộ khóa công khai của mình như một biệt danh trong khi vẫn giữ bí mật độc quyền về khóa riêng tư của họ. Một người có thể chọn một khóa riêng tư, phái sinh một biệt danh từ nó và nhận khoản thanh toán Bitcoin thay cho biệt danh đó. Vì người đó sở hữu độc quyền khóa riêng tư, nó có thể được sử dụng để chứng minh quyền sở hữu đối với biệt danh liên kết và tất cả tài sản của nó.

Biệt danh phổ biến nhất là địa chỉ Bitcoin. Để phái sinh địa chỉ Bitcoin từ khóa công khai, chúng ta cần thêm một vài bước nữa như trong Hình 4.1. Địa chỉ Bitcoin không gì khác hơn là một giá trị băm (hash value) của khóa công khai (xem phần 4.2). Hiện tại, chúng ta sẽ coi khóa công khai và địa chỉ Bitcoin là tương đương nhau. Chúng ta sẽ xem xét một số lợi thế của địa chỉ Bitcoin sau và phân biệt chúng với khóa công khai.

Để mô tả thêm về biệt danh và quyền truy cập, chúng ta sẽ đi theo Tamara, người vừa tham gia mạng Bitcoin trong Chương 3. Tamara hiện cần một biệt danh để nhận các đơn vị Bitcoin. Các bước sau sẽ được thực hiện bởi phần mềm ví của cô ấy:

Đầu tiên, một số ngẫu nhiên $k_{prv}$ được chọn làm khóa riêng tư:
$$k_{prv} = 100649517912463298218554941963735551419990919394775808943667076258561523410426$$

Từ $k_{prv}$, phần mềm phái sinh khóa công khai tương ứng bằng phép nhân trên đường cong elliptic. Tamara nhận được một điểm có tọa độ sau làm khóa công khai của mình:
$$x_{Kpub} = 43086108819063845471784291298828806947352645388418363213743744756576526107326$$
$$y_{Kpub} = 74604540087345955209626838334808422259785486813648239447613724663528494663884$$

---

### 4.1.2 Biểu diễn các Khóa (Representation of the Keys)

Như chúng ta đã thấy, tất cả các khóa và biệt danh không gì khác ngoài các con số. Vì sự đơn giản, cho đến nay chúng ta đã trình bày các con số này trong hệ thập phân cổ điển (decimal numeral system). Tuy nhiên, dạng biểu diễn của một giá trị có thể thay đổi.

Các khóa và biệt danh được tạo ra và xử lý bởi máy tính trong hệ nhị phân (binary numeral system) - tức là một chuỗi dài các ký tự số không và số một, trong đó mỗi chữ số nhị phân được gọi là một "bit". Biểu diễn nhị phân là lý tưởng cho việc xử lý hiệu quả bởi máy móc.

Tuy nhiên, đối với con người, chuỗi nhị phân quá dài và dễ xảy ra lỗi khi sao chép. Do đó, các hệ thống số khác được sử dụng để hiển thị các khóa và biệt danh. Hệ thống phổ biến nhất được sử dụng cho các khóa riêng tư và một số địa chỉ Bitcoin là **Base58Check**.

Hệ thống Base58Check sử dụng cơ số 58, bao gồm:
* Các số nguyên từ 1–9.
* Tất cả các chữ cái viết hoa và viết thường, ngoại trừ **O** (chữ O viết hoa), **l** (chữ l viết thường), và **I** (chữ I viết hoa).

Cơ số lớn cho phép thông tin được viết một cách rất nhỏ gọn. Đồng thời, định dạng này tránh các ký tự chữ-số dễ gây nhầm lẫn khi sao chép bằng tay. Như một biện pháp bổ sung chống lại các lỗi truyền tải, định dạng này chứa một mã kiểm tra (checksum) giúp nhận diện một số lỗi nhập liệu.

Base58Check được sử dụng để hiển thị khóa riêng tư và một số biệt danh, trong đó một tiền tố (prefix) xác định loại dữ liệu:
* Nếu chuỗi bắt đầu bằng **1**, **3**, hoặc **bc**, đó là một biệt danh (địa chỉ Bitcoin).
* Tiền tố **5**, **K**, và **L** ám chỉ một khóa riêng tư. Khóa riêng tư trong định dạng Base58Check còn được gọi là các khóa **định dạng nhập ví** (Wallet Import Format - WIF).

Hộp 4.1 trình bày cùng một khóa riêng tư của Tamara trong các hệ thống số khác nhau.

#### **Hộp 4.1: Khóa riêng tư với các định dạng khác nhau**
* **Nhị phân:** `11011110100001011001101110111101000010111101110000001111000111...` (đầy đủ 256 bits)
* **Thập phân:** `100649517912463298218554941963735551419990919394775808943667076258561523410426`
* **Thập lục phân (Hexadecimal):** `de859bbd0bdc0f1e929238f9a935bf519af23bd5a6f9bf300becdfe9279b65fa`
* **Base58Check (WIF):** `5KWHc3RENTEdyZg1s8WphuWcsPMhivBvCCngWavocfdeDDD7DVS`

Ngoài ra, mã phản hồi nhanh (**QR code**) có thể được sử dụng để biểu diễn các khóa một cách trực quan. Mã QR là mã vạch hai chiều có thể được đọc bởi máy quét QR. Điều này đặc biệt hữu ích nếu người dùng muốn nhập bản sao lưu vật lý của khóa riêng tư vào phần mềm ví.

Khóa công khai thường được biểu diễn dưới dạng thập lục phân (hexadecimal - cơ số 16), sử dụng các số nguyên 0–9 và các ký tự a–f. Một ký tự thập lục phân đại diện cho chính xác 4 bit nhị phân ($2^4 = 16$).

Khi các tọa độ khóa công khai của Tamara từ phần 4.1.1 được chuyển đổi sang hệ thập lục phân, chúng tạo ra hai chuỗi ký tự sau:
$$x_{Kpub} = 5f41df966899767381592461911e12789393736b29...0a5d4beda3ba573d5582be$$
$$y_{Kpub} = a4f0ac5d9ca56b776db9f10895303efc8450892e0f...8bd99db228dbd1206f08cc$$

Để biểu diễn chúng trong một chuỗi ký tự duy nhất, các tọa độ được nối lại với nhau và được bổ sung thêm tiền tố **04** [4]. Biểu diễn này được gọi là **khóa công khai chưa nén** (uncompressed public key) $K_{pub}$:
$$K_{pub} = 04 \parallel x_{Kpub} \circ y_{Kpub} = 045f41df966899767381592461911e12789393736b...$$

Bởi vì khóa công khai tương ứng với một điểm trên một đường cong elliptic đã được định nghĩa trước, tọa độ $x$ là đủ để tính toán tọa độ $y$ tương ứng. Chính xác hơn, với bất kỳ giá trị $x$ nào, có không quá hai ứng viên tiềm năng cho $y$ do tính đối xứng của các đường cong elliptic (xem phần 4.3.2). Để có được một điểm duy nhất, giá trị $x$ được mở rộng bằng một tiền tố:
* Tiền tố là **02** nếu giá trị $y$ của khóa công khai là số chẵn.
* Tiền tố là **03** nếu giá trị $y$ là số lẻ.

Trong trường hợp của Tamara, tiền tố **02** được sử dụng. Biểu diễn nén này của khóa công khai sẽ được gọi là **khóa công khai nén** (compressed public key) $K_{pub}$:
$$K_{pub} = 025f41df966899767381592461911e12789393736b...290a5d4beda3ba573d5582be$$

Khóa công khai nén có lợi thế lớn là nó ngắn hơn. Đối với hầu hết các giao dịch, các khóa công khai phải được đưa vào giao dịch tại một thời điểm nào đó (xem phần 4.5) và do đó trở thành một phần của chuỗi khối Bitcoin. Độ dài khóa ngắn hơn giúp giảm không gian lưu trữ yêu cầu trên blockchain.

---

### 4.1.3 Địa chỉ Bitcoin (Bitcoin Addresses)

Biệt danh phổ biến nhất là địa chỉ Bitcoin. Nó được phái sinh từ một khóa công khai bằng cách áp dụng liên tiếp hai hàm băm (Double Hash - SHA256 tiếp nối bởi RIPEMD160). Hàm băm kép này là một hàm một chiều; nói cách khác, khóa công khai không thể được phái sinh ngược lại từ địa chỉ Bitcoin.

Một địa chỉ Bitcoin truyền thống có độ dài 160 bit nhưng thường được biểu diễn dưới định dạng Base58Check với tiền tố **1**. Địa chỉ Bitcoin còn được gọi là **băm khóa công khai** (public-key-hashes).

Những lợi thế chính của địa chỉ Bitcoin so với khóa công khai là:
1. **Tính tiện lợi:** Địa chỉ Bitcoin ngắn hơn đáng kể so với khóa công khai và do đó phù hợp hơn cho việc sử dụng hàng ngày. Nó chứa một mã kiểm tra nhờ mã hóa Base58Check để phát hiện lỗi gõ phím.
2. **Tính bảo mật gia tăng:** Ngay cả khi một kẻ tấn công phát hiện ra lỗ hổng trong đường cong elliptic, hắn chỉ có thể bắt đầu tấn công khi có được khóa công khai của mục tiêu. Địa chỉ Bitcoin đảm bảo rằng khóa công khai chỉ phải được tiết lộ tại thời điểm thực hiện giao dịch chi tiêu. Điều này làm cho địa chỉ Bitcoin mạnh mẽ hơn nhiều trước mối đe dọa từ máy tính lượng tử trong tương lai.
3. **Tính linh hoạt (Địa chỉ P2SH):** Địa chỉ Bitcoin cũng có thể được xây dựng dưới dạng địa chỉ thanh toán cho băm script (Pay-to-Script-Hash - P2SH). Những địa chỉ này không được phái sinh từ giá trị băm của một khóa công khai, mà thay vào đó dựa trên giá trị băm của toàn bộ một script khóa (locking script) ràng buộc quyền truy cập vào một điều kiện cụ thể. Điều này cho phép tạo ra các cấu trúc biệt danh đặc biệt, chẳng hạn như yêu cầu thanh toán phải được ký bởi nhiều khóa riêng tư (đa chữ ký - xem phần 4.5.4) hoặc chỉ có thể được chi tiêu sau một khoảng thời gian nhất định. Các địa chỉ Pay-to-Script-Hash này luôn bắt đầu bằng số **3**.

#### **Hộp 4.2: Khóa nén và Địa chỉ Bitcoin**
Mặc dù các khóa công khai nén và chưa nén đại diện cho cùng một điểm trên đường cong elliptic và bắt nguồn từ cùng một khóa riêng tư, chúng dẫn đến các địa chỉ Bitcoin khác nhau:
* Nếu Tamara tạo địa chỉ Bitcoin từ khóa công khai chưa nén $K_{pub}$, cô ấy nhận được địa chỉ $B$:
  $$B = 1E8jc2eRXmjF2FKebTZwAsxwaRWeDvEwDj$$
* Nếu cô ấy sử dụng khóa công khai nén $K_{pub}$, cô ấy nhận được địa chỉ $B^*$:
  $$B^* = 13HE523Wvpqzjijjb1z3NDUz25AQN2eLw1$$

Tamara có thể sử dụng khóa riêng tư của mình để truy cập cả hai địa chỉ Bitcoin này. Tuy nhiên, khóa riêng tư của cô ấy có thể được biểu diễn theo hai cách riêng biệt:
* Các khóa riêng tư bắt đầu bằng tiền tố **5** dùng để quản lý các địa chỉ Bitcoin được tạo ra từ khóa công khai chưa nén.
* Các khóa riêng tư bắt đầu bằng tiền tố **K** hoặc **L** được sử dụng để quản lý các địa chỉ Bitcoin được tạo ra từ khóa công khai nén.

Thông tin trong tiền tố hướng dẫn phần mềm ví biết biệt danh nào cần kiểm tra số dư và do đó làm tăng đáng kể hiệu quả xử lý. Phiên bản WIF "nén" của khóa riêng tư $k_{prv}$ của Tamara tương ứng với chuỗi sau:
$$k_{prv}^* = L4gGHffx1goCCfDCpGAdZYmjKPgNk1mBnT2dPakUkRWjEec7ArQY$$

Nói một cách nghiêm ngặt, thuật ngữ khóa riêng tư "nén" là không chính xác. Nó không phải là một phiên bản nén của thông tin mà chỉ đơn thuần là một tín hiệu cho biết biệt danh nào cần sử dụng. Thực tế, khóa riêng tư "nén" thậm chí dài hơn 8 bit (hoặc 2 ký tự thập lục phân) so với định dạng chưa nén. Độ dài của khóa riêng tư không quá quan trọng vì nó không bao giờ được truyền đi cùng các giao dịch và do đó không làm tăng gánh nặng cho blockchain.

---

### 4.1.4 Biệt danh dùng một lần (Disposable Pseudonyms)

Tất cả các biệt danh trong hệ thống Bitcoin được thiết kế để chỉ sử dụng một lần. Điều này có vẻ không trực quan (so với số tài khoản ngân hàng), nhưng nó dựa trên thực tế là chuỗi khối Bitcoin là công khai. Nếu một người luôn sử dụng cùng một biệt danh, những người khác sẽ dễ dàng xác định các mô hình giao dịch và truy vết danh tính thực của biệt danh đó. Nếu việc nhận dạng thành công, tất cả các giao dịch trong quá khứ và tương lai của người liên quan có thể bị truy vấn và giám sát.

Để làm cho các phân tích như vậy trở nên khó khăn hơn, hầu hết các ví tạo ra một cặp khóa mới cho mỗi giao dịch và luôn sử dụng các địa chỉ Bitcoin khác nhau. Khi một khoản thanh toán được thực hiện, ví gửi số tiền được lập hóa đơn đến địa chỉ của người nhận hóa đơn và đồng thời tạo ra các địa chỉ mới để chuyển số tiền dư còn lại (tiền thừa - change) về đó. Người quan sát không thể phân biệt giữa số tiền thanh toán và tiền thừa, và họ cũng không thể phát hiện ra biệt danh nào được giữ lại bởi chủ sở hữu.

---

### 4.1.5 Ví Định thức và Phi định thức (Deterministic and Nondeterministic Wallets)

Để thực hiện các biệt danh chỉ sử dụng một lần, ví phải tạo và lưu trữ một số lượng lớn các khóa và biệt danh. Có nhiều cách tiếp cận khác nhau để thực hiện việc này, khác nhau về quy trình lựa chọn cũng như cách thức tổ chức và quản trị:

1. **Ví phi định thức (Nondeterministic Wallets):** Các triển khai phi định thức (Hình 4.3) dựa trên một số lượng lớn các khóa riêng tư được lựa chọn ngẫu nhiên khi tạo biệt danh. Một số ngẫu nhiên mới được chọn cho mỗi khóa riêng tư. Một ví dụ về phương pháp phi định thức này là triển khai ban đầu của ví Bitcoin Core. Ví đã tạo ra một trăm cặp khóa và địa chỉ Bitcoin liên kết trong quá trình thiết lập ban đầu (gọi là keypool). Bất cứ khi nào có nhu cầu về các biệt danh bổ sung, ví sau đó sẽ tạo ra các địa chỉ mới.
   * **Nhược điểm:** Người dùng phải tạo bản sao lưu (backup) cho từng khóa riêng tư mới được tạo ra. Nếu keypool cạn kiệt, một bản sao lưu mới phải được tạo cho mỗi khóa bổ sung, dẫn đến việc quản lý dữ liệu kém hiệu quả và dễ mất tiền nếu thiết bị hỏng trước khi kịp backup.

2. **Ví định thức (Deterministic Wallets):** Đây là một giải pháp thay thế hiệu quả hơn (Hình 4.4). Chúng sử dụng một số ngẫu nhiên rất lớn $s$, đóng vai trò là hạt giống (seed) để lựa chọn tất cả các khóa riêng tư. Phương pháp này có thể được triển khai theo những cách đơn giản; ví dụ, bằng cách sử dụng một hàm băm mật mã $H(i, s)$ để tính toán giá trị băm của seed $s$ được liên kết với chỉ số (index) $i$, sau đó sử dụng giá trị băm đó làm khóa riêng tư:
   $$k_{i,prv} = H(i, s)$$
   Quy trình này cho phép lựa chọn vô hạn các khóa riêng tư mới $k_{i,prv}$, tất cả đều có thể được khôi phục hoàn toàn chỉ bằng giá trị seed được sao lưu ban đầu [149]. Điều quan trọng cần nhấn mạnh là không có khóa nào trong chuỗi này (nhờ tính chất của hàm băm) cho phép suy luận ngược lại về seed hoặc bất kỳ khóa nào khác. Người ngoài cũng không thể phân biệt được các biệt danh được phái sinh từ seed với các biệt danh được tạo ra bởi một ví phi định thức.

3. **Ví định thức phân cấp (Hierarchical Deterministic - HD Wallets):** HD Wallets (Hình 4.5) có tất cả các ưu điểm của ví định thức đơn giản nhưng mở rộng phạm vi chức năng của chúng bằng một phân cấp nghiêm ngặt của các khóa và biệt danh được tạo ra, mở ra nhiều ứng dụng thú vị. Chúng cũng dựa trên một seed ban đầu $s$ từ đó tạo ra một khóa gốc (master key) $k_{m,prv}$. Các khóa sau đó được phái sinh theo cấu trúc cây. Các nhánh mới có thể rẽ nhánh từ mỗi khóa, dẫn đến các khóa phụ mới. Một khóa mở rộng (extended key - bao gồm khóa và chain code) [5] cho phép phái sinh tất cả các khóa phụ của cùng một loại (riêng tư hoặc công khai). Ngược lại, các khóa phụ không thể được sử dụng để suy luận ra các khóa tiền nhiệm của chúng.

Sự phân cấp nghiêm ngặt này mang lại hai lợi thế lớn:
* **Khả năng chia sẻ nhánh cụ thể:** Ví dụ, một công ty có thể tạo ra các nhánh riêng biệt cho từng đơn vị kinh doanh. Trụ sở chính nắm giữ khóa gốc $k_{m,prv}$ và do đó vẫn kiểm soát tất cả các biệt danh. Đồng thời, các đơn vị kinh doanh khác nhau có thể tạo ra các khóa phụ của riêng họ và hoạt động độc lập.
* **Tách biệt khóa riêng tư và khóa công khai:** Nguyên lý phái sinh áp dụng cho cả khóa riêng tư mở rộng ($xprv$) và khóa công khai mở rộng ($xpub$). Do đó, nó có thể được sử dụng để tạo ra các khóa công khai phụ từ khóa công khai mở rộng mà không cần đến khóa riêng tư tương ứng. Điều này có nghĩa là một thiết bị có khả năng bảo mật kém (như máy chủ web bán hàng) có thể được sử dụng để tạo ra các biệt danh mới cho các khoản thanh toán đến mà không bao giờ cần phải có quyền truy cập vào khóa riêng tư. Các khóa công khai mở rộng này cũng rất hữu ích cho các ứng dụng kế toán và kiểm toán, cho phép theo dõi tất cả các giao dịch được thực hiện với bất kỳ biệt danh nào của một nhánh mà không cần chuyển quyền kiểm soát số dư Bitcoin cho người quan sát.

Tiêu chuẩn cho ví HD được quy định bởi hai Đề xuất Cải tiến Bitcoin là **BIP0032** [229] và **BIP0044** [170]. Tiêu chuẩn **BIP0039** [171] quy định chi tiết về biểu diễn đơn giản hóa và khả năng tương thích của các seed dưới dạng chuỗi từ dễ nhớ (mnemonic words).

#### **Hộp 4.3: Hạt giống dễ nhớ (Mnemonic Seeds)**
Các hạt giống cho ví định thức phân cấp là các chuỗi nhị phân dài và do đó rất khó nhớ. Ngoài ra, có nguy cơ xảy ra lỗi truyền tải hoặc viết sai khi sao lưu bằng tay. Để giải quyết các vấn đề này, người ta sử dụng một tổ hợp các từ dễ nhớ (mnemonic words) và một hàm phái sinh khóa an toàn mật mã.

Hàm phái sinh khóa **PBKDF2** (Password Based Key Derivation Function) cho phép tạo ra seed từ một chuỗi nhị phân nhỏ hơn (thường từ 128 đến 256 bit ngẫu nhiên). Mnemonic seed mã hóa lại chuỗi nhị phân ngẫu nhiên này thành nhiều từ tiếng Anh thông thường và từ đó đơn giản hóa việc quản lý của người dùng. Tiêu chuẩn **BIP0039** cho phép các hạt giống này dễ dàng được nhập vào và xuất ra giữa các ví khác nhau và cho phép sử dụng đồng thời một ví trên nhiều thiết bị.

Về nguyên tắc, các từ dễ nhớ có thể được coi là một định dạng mã hóa với cơ số 2,048 (tức là có 2,048 từ khác nhau trong một từ điển được xác định trước). Mỗi từ thay thế chính xác 11 bit ($2^{11} = 2,048$). Tùy thuộc vào độ dài bit của dữ liệu ngẫu nhiên ban đầu, người ta sử dụng từ 12 đến 24 từ. Định dạng này cũng bao gồm một mã kiểm tra (checksum) phụ thuộc vào độ dài của dữ liệu ngẫu nhiên để đảm bảo tính toàn vẹn.

Ví dụ dưới đây cho thấy một chuỗi từ dễ nhớ có độ dài 128 bit (mã kiểm tra = 4 bit) được tạo ra cho khóa riêng tư của Tamara:
`wolf anchor draft manual heavy rapid physical system matrix clean solid legal`

---

### 4.1.6 Đánh giá An toàn Khóa Công khai (Public Key Security Considerations)

Bởi vì các khóa riêng tư là các con số được chọn từ một tập hợp đóng (mặc dù rất lớn), tất cả các giá trị khả thi đều đã biết. Về mặt lý thuyết, điều này có thể dẫn đến sự trùng lặp (collision):

1. **Trùng lặp khóa riêng tư:** Nếu Edith và Tamara vô tình chọn cùng một con số và do đó có cùng một khóa riêng tư, cả hai sẽ có quyền truy cập không hạn chế vào một biệt danh chung. Một tình huống đặc biệt tồi tệ là khi Edith đang quản lý tiền tiết kiệm của mình thông qua một biệt danh và Tamara sau đó chọn đúng khóa riêng tư đó - Tamara khi đó sẽ có thể lấy đi toàn bộ tiền tiết kiệm của Edith.
2. **Trùng lặp địa chỉ (Băm trùng lặp):** Trường hợp Edith và Tamara chọn các khóa riêng tư khác nhau, nhưng các khóa công khai của họ lại có cùng một giá trị băm và do đó tạo ra cùng một địa chỉ Bitcoin. Kịch bản này sẽ dẫn đến việc một địa chỉ Bitcoin duy nhất bị kiểm soát bởi nhiều khóa riêng tư khác nhau.

Sự tồn tại lý thuyết của các trùng lặp như vậy là rõ ràng khi người ta xem xét rằng số lượng địa chỉ Bitcoin có thể có (khoảng $2^{160}$ giá trị) thấp hơn nhiều so với số lượng khóa riêng tư có thể có (khoảng $2^{256}$ giá trị). Dưới đây chúng ta xem xét xác suất thành công của ba cuộc tấn công tiềm năng:

* **Tấn công 1: Tìm khóa cho một địa chỉ cụ thể.** Tamara phát hiện một địa chỉ Bitcoin trên blockchain đang nắm giữ một số lượng lớn Bitcoin. Để đánh cắp số Bitcoin này, cô ấy phải tìm khóa riêng tư liên kết. Vì phép nhân điểm trên đường cong elliptic và hàm băm kép là các hàm một chiều, Tamara chỉ có thể tìm khóa riêng tư bằng một cuộc tấn công vét cạn (brute-force attack). Có $2^{160}$ ứng viên địa chỉ.
  Xác suất tìm thấy khóa riêng tư cho địa chỉ đã cho trong một lần thử tương ứng với tỷ lệ $1 / 2^{160}$. Nếu giả định Tamara sở hữu một máy tính hiện đại với card đồ họa chuyên dụng mạnh mẽ và có thể tạo ra 60 tỷ cặp khóa/địa chỉ mỗi giây, thì cô ấy sẽ cần hơn **7 nghìn tỷ tỷ tỷ năm** (7 octillion years) để tìm thấy khóa riêng tư tương ứng với xác suất chỉ 1%. Độ tuổi của vũ trụ được ước tính là 13.82 tỷ năm - nhỏ hơn khoảng 506 triệu tỷ lần so với thời gian Tamara cần. Do đó, loại tấn công vét cạn này là hoàn toàn bất khả thi.

* **Tấn công 2: Tìm khóa cho bất kỳ địa chỉ nào có số dư dương.** Thay vì nhắm vào một địa chỉ cụ thể, Tamara cố gắng tìm khóa riêng tư cho bất kỳ địa chỉ nào có tiền trên blockchain. Giả sử tại thời điểm tấn công có khoảng $2.1 \times 10^{15}$ địa chỉ Bitcoin có số dư dương. Xác suất thành công trong một lần thử bây giờ tăng lên thành $2.1 \times 10^{15} / 2^{160}$. Ngay cả dưới những giả định cực kỳ có lợi này, Tamara vẫn sẽ cần gần **3.7 nghìn tỷ năm** để giành quyền kiểm soát một trong những địa chỉ này với xác suất 1%.
  Hơn nữa, nếu có nguồn tài nguyên tính toán khổng lồ như vậy, việc sử dụng chúng vào hoạt động đào Bitcoin (mining) sẽ mang lại lợi nhuận kinh tế hợp pháp lớn hơn và chắc chắn hơn nhiều so với việc cố gắng tìm kiếm khóa trùng lặp.

* **Tấn công 3: Trùng lặp ngẫu nhiên (Nghịch lý ngày sinh - Birthday Paradox).** Chúng ta xem xét xác suất xảy ra một sự trùng lặp địa chỉ ngẫu nhiên bất kỳ trong mạng lưới - tức là xác suất tìm thấy ít nhất hai khóa riêng tư khác nhau tạo ra cùng một địa chỉ Bitcoin trong toàn bộ mạng lưới.
  Để lưu trữ an toàn các địa chỉ và khóa riêng tư tương ứng nhằm tìm kiếm sự trùng lặp theo nguyên lý nghịch lý ngày sinh, người ta cần có khoảng 300 nghìn tỷ terabyte (TB) không gian lưu trữ. Giả sử mỗi người trên Trái Đất sở hữu một máy tính để bàn trung bình và tạo địa chỉ Bitcoin liên tục không ngừng, thì vẫn phải mất hơn 300 năm trước khi tổng dân số thế giới có thể vượt qua số lượng khóa tới hạn để có cơ hội xảy ra trùng lặp. Đồng thời, khoảng 50,000 TB dung lượng lưu trữ sẽ phải được chuẩn bị sẵn cho mỗi người trên hành tinh.

Tóm lại, một hệ thống dựa trên các khóa và biệt danh là an toàn về mặt mật mã. Tuy nhiên, điều này chỉ đúng với giả định rằng các khóa riêng tư được lựa chọn một cách hoàn toàn ngẫu nhiên. Các khóa riêng tư hiển thị một mô hình cụ thể hoặc tương ứng với giá trị băm của các từ hoặc câu có thể đoán được (tấn công từ điển - dictionary attacks) là cực kỳ không an toàn (còn gọi là brain wallet tự chế). Do đó, việc lựa chọn khóa riêng tư bằng một quy trình ngẫu nhiên thực sự là bắt buộc. Trong thực tế, các ví sử dụng bộ tạo số giả ngẫu nhiên an toàn mật mã (CSPRNG) kết hợp với các nguồn dữ liệu hỗn loạn bên ngoài như chuyển động chuột hoặc phím gõ để đảm bảo tính an toàn.

#### **Hộp 4.4: Tạo khóa riêng tư bằng đồng xu và xúc xắc**
Một khóa riêng tư không gì khác ngoài một con số được chọn ngẫu nhiên từ một tập hợp cực kỳ lớn.
* **Sử dụng đồng xu:** Người ta có thể tung một đồng xu $c$ 256 lần và ghi lại kết quả dưới dạng chuỗi nhị phân gồm các số 0 và 1. Khóa riêng tư được tạo ra là chuỗi nhị phân này. Để chuyển sang hệ thập phân, người ta nhân kết quả của lần tung thứ $i$ với $2^{256-i}$ và cộng tổng tất cả các sản phẩm:
  $$k_{prv, b=10} = \sum_{i=1}^{256} c_i \cdot 2^{256-i}$$
* **Sử dụng xúc xắc:** Người ta có thể gieo một con xúc xắc $d$ (trong đó mặt 6 chấm được ghi nhận là số 0) tổng cộng 99 lần để tạo ra một con số trong hệ lục phân (cơ số 6). Khóa riêng tư thập phân được tính bằng công thức:
  $$k_{prv, b=10} = \sum_{i=1}^{99} d_i \cdot 6^{99-i}$$

Hai phương pháp thủ công này có lợi thế lớn là dẫn đến kết quả ngẫu nhiên thực sự dựa trên hiện tượng vật lý, cung cấp mức độ bảo mật cao nhất khi tạo khóa riêng tư mà không sợ các phần mềm độc hại trên máy tính can thiệp.

---

## 4.2 Hàm băm (Hash Functions)

Nhiều phần chức năng của Bitcoin dựa trên các hàm băm. Số định danh khối (Block ID) là giá trị băm của đầu khối (block header). Địa chỉ Bitcoin là giá trị băm của khóa công khai liên kết, và ngay cả các giao dịch riêng lẻ cũng được định danh bằng giá trị băm của chúng.

Xét một hàm băm $H$ gán một giá trị băm $h$ cho một đầu vào $m$ có độ dài bất kỳ sao cho:
$$H(m) = h$$

Đầu vào $m$ không bị giới hạn về định dạng và có thể là một chuỗi ký tự có độ dài bất kỳ. Giá trị băm $h$, ngược lại, có độ dài cố định và được hiển thị dưới dạng một chuỗi nhị phân hoặc thập lục phân có độ dài xác định. Phép ánh xạ này là định thức (deterministic): một đầu vào $m$ cho trước sẽ luôn dẫn đến cùng một giá trị băm $h$. Các hàm băm không phải là đơn ánh (not injective), do đó có thể có trường hợp các đầu vào khác nhau tạo ra cùng một giá trị băm. Những sự chồng chéo này được gọi là "sự trùng lặp" (collisions).

Để ứng dụng trong mật mã học, các hàm băm phải là các **hàm băm mật mã** (cryptographic hash functions) đáp ứng các thuộc tính nghiêm ngặt sau:
1. **Kháng tiền ảnh (One-way / Pre-image resistance):** Rất dễ để tính $h$ từ $m$, nhưng bất khả thi về mặt tính toán để tìm ngược lại $m$ từ một giá trị băm $h$ cho trước.
2. **Kháng tiền ảnh thứ hai (Second pre-image resistance):** Cho trước đầu vào $m_1$, bất khả thi về mặt tính toán để tìm một đầu vào khác $m_2$ sao cho $H(m_1) = H(m_2)$.
3. **Kháng trùng lặp (Collision resistance):** Bất khả thi về mặt tính toán để tìm ra bất kỳ hai đầu vào khác nhau $m_1$ và $m_2$ nào sao cho $H(m_1) = H(m_2)$.

---

### 4.2.1 Đảm bảo tính Toàn vẹn qua Giá trị Băm (Integrity Through Hash Values)

Các hàm băm mật mã có thể đảm bảo tính toàn vẹn của dữ liệu gốc. Bất kỳ điều chỉnh nhỏ nào đối với đầu vào ban đầu sẽ dẫn đến một giá trị băm hoàn toàn khác biệt. Điều này được minh họa qua hai ví dụ sử dụng hàm băm SHA256:

* $m_1$ = `"The transactions A and C are valid."`
  * $h_1$ = `89ab2d7d31d072477c5416916cb9d358e8cd5451601ad909b7a183a136f50571`
* $m_2$ = `"The transactions A and B are valid."`
  * $h_2$ = `08914363734543c80e7983ca7c85e921effecc017688daa59813221d05a8e72d`

Mặc dù hai văn bản chỉ khác nhau duy nhất một chữ cái ("C" và "B"), các giá trị băm kết quả hoàn toàn khác nhau và không hiển thị bất kỳ mối liên hệ nào. Thuộc tính này được gọi là **hiệu ứng tuyết lở** (avalanche effect).

---

### 4.2.2 Giá trị Băm dưới dạng Bằng chứng Công việc (Hash Values as Proof of Work)

Do tính chất ngẫu nhiên của đầu ra và không thể dự đoán trước được kết quả băm từ đầu vào, cách duy nhất để tìm một đầu vào tạo ra giá trị băm có các đặc điểm cụ thể (ví dụ: bắt đầu bằng một số lượng ký tự số 0 nhất định) là thử nghiệm liên tục bằng cách thay đổi một phần nhỏ của dữ liệu đầu vào gọi là **nonce** (số dùng một lần).

Trung bình, để tìm được một giá trị băm bắt đầu bằng một ký tự số `0` trong hệ thập lục phân, người ta phải thử 16 lần khác nhau ($16^1$). Để tìm một giá trị băm bắt đầu bằng $n$ ký tự số `0`, số lần thử trung bình tăng theo cấp số nhân là $16^n$. Việc trình bày một đầu vào hợp lệ tạo ra một giá trị băm đáp ứng tiêu chí này là bằng chứng toán học không thể chối cãi rằng người tạo ra nó đã tiêu tốn một lượng tài nguyên tính toán trung bình tương ứng. Đây chính là nền tảng của cơ chế đồng thuận Bằng chứng công việc (Proof of Work) của Bitcoin.

---

## 4.3 Chữ ký điện tử (Signatures)

Trong phần này, chúng ta sẽ xem xét cách các khóa riêng tư và công khai được liên kết toán học với nhau và cách khóa riêng tư được sử dụng để chứng minh quyền sở hữu đối với một biệt danh hoặc để chứng minh tính xác thực và toàn vẹn của một thông điệp giao dịch [10].

---

### 4.3.1 Ứng dụng của Mật mã học Bất đối xứng (Applications of Asymmetric Cryptography)

Các ứng dụng mật mã học cổ điển dựa trên phương pháp mã hóa đối xứng (symmetric encryption), nơi hai bên sử dụng chung một khóa bí mật duy nhất để mã hóa và giải mã. Hạn chế lớn nhất là họ phải trao đổi khóa này qua một kênh truyền thông an toàn trước khi có thể liên lạc mật mã.

Mật mã học bất đối xứng (asymmetric cryptography) giải quyết triệt để vấn đề này bằng cách sử dụng các cặp khóa riêng biệt: Khóa công khai ($K_{pub}$) có thể được chia sẻ công khai cho bất kỳ ai, trong khi khóa riêng tư ($k_{prv}$) phải được giữ bí mật tuyệt đối. Cặp khóa này hỗ trợ hai ứng dụng chính (Hình 4.6):

1. **Bảo mật (Secrecy):** Bất kỳ ai cũng có thể sử dụng khóa công khai của người nhận để mã hóa một thông điệp. Chỉ có người nhận sở hữu khóa riêng tư tương ứng mới có thể giải mã thông điệp đó.
2. **Tính xác thực và toàn vẹn (Authenticity and Integrity):** Nếu một người mã hóa (ký) một thông điệp bằng khóa riêng tư của họ, bất kỳ ai cũng có thể sử dụng khóa công khai tương ứng để giải mã và xác thực thông điệp đó. Việc giải mã thành công bằng khóa công khai chứng minh rằng thông điệp thực sự được tạo ra bởi người sở hữu khóa riêng tư liên kết (tính xác thực) và nội dung của nó không bị thay đổi trong quá trình truyền tải (tính toàn vẹn). Khái niệm này được gọi là **chữ ký điện tử** (digital signature).

Bitcoin sử dụng chữ ký điện tử để xác thực nguồn gốc và bảo vệ tính toàn vẹn của tất cả các thông điệp giao dịch.

---

### 4.3.2 Nền tảng của Đường cong Elliptic (The Foundations of Elliptic Curves)

Bitcoin sử dụng mật mã học bất đối xứng dựa trên các đường cong elliptic. So với các phương pháp khác (như RSA), chữ ký trên đường cong elliptic yêu cầu độ dài khóa ngắn hơn nhiều để đạt được cùng một mức độ bảo mật, đồng thời quy trình tính toán cũng hiệu quả hơn nhiều.

Đường cong elliptic trong dạng tổng quát được xác định bởi phương trình Weierstrass:
$$y^2 = x^3 + ax + b$$

Để ứng dụng trong mật mã học, các đường cong elliptic phải được định nghĩa trên một trường hữu hạn (Galois field) thay vì trường số thực continuous. Phép toán cộng và nhân điểm trên đường cong elliptic có các tính chất đại số đặc biệt tạo thành một nhóm cyclic.

* **Phép cộng hai điểm (The Addition of Two Points):** Phép cộng hai điểm $P_1$ và $P_2$ trên đường cong được thực hiện về mặt hình học bằng cách vẽ một đường thẳng đi qua hai điểm này. Đường thẳng sẽ cắt đường cong tại một điểm thứ ba duy nhất, ký hiệu là $-P_3$. Bằng cách lấy đối xứng điểm này qua trục hoành ($x$-axis), chúng ta thu được điểm kết quả $P_3$ (Hình 4.8):
  $$P_3 = P_1 + P_2$$
  Về mặt đại số, độ dốc (slope) $s$ của đường thẳng nối hai điểm được tính bằng:
  $$s = \frac{y_{P1} - y_{P2}}{x_{P1} - x_{P2}}$$
  Từ đó, tọa độ của điểm $P_3$ được tính bằng công thức:
  $$x_{P3} = s^2 - (x_{P1} + x_{P2})$$
  $$y_{P3} = s(x_{P1} - x_{P3}) - y_{P1}$$

* **Phép nhân đôi điểm (Point Doubling):** Đây là trường hợp đặc biệt của phép cộng khi cộng một điểm $P$ với chính nó để thu được điểm $2P$ ($P + P = 2P$). Về mặt hình học, điều này tương ứng với việc vẽ đường tiếp tuyến của đường cong tại điểm $P$. Đường tiếp tuyến này sẽ cắt đường cong tại điểm $-2P$, lấy đối xứng qua trục hoành ta có điểm $2P$ (Hình 4.9).
  Về mặt đại số, độ dốc $s$ của tiếp tuyến được tính bằng đạo hàm bậc nhất của phương trình đường cong tại điểm $P$:
  $$s = \frac{3x_P^2 + a}{2y_P}$$
  Tọa độ của điểm $2P$ được tính bằng:
  $$x_{2P} = s^2 - 2x_P$$
  $$y_{2P} = s(x_P - x_{2P}) - y_P$$

---

### 4.3.3 Đường cong Elliptic trên các Trường Hữu hạn (Elliptic Curves over Finite Fields)

Bitcoin sử dụng tiêu chuẩn **secp256k1**, định nghĩa đường cong elliptic trên một trường hữu hạn $F_p$, trong đó $p$ là một số nguyên tố cực kỳ lớn:
$$p = 2^{256} - 2^{32} - 2^9 - 2^6 - 2^4 - 1$$

Các tham số được sử dụng là $a=0$ và $b=7$, dẫn đến phương trình đường cong:
$$\{ (x, y) \in F_p \mid y^2 = x^3 + 7 \} \cup \{0\}$$
trong đó các tọa độ $x$ và $y$ chỉ có thể nhận các giá trị số nguyên nằm trong khoảng từ $0$ đến $p-1$.

Vì số nguyên tố $p$ của Bitcoin quá lớn để biểu diễn trực quan, chúng ta sẽ thảo luận các nguyên lý cơ bản bằng cách sử dụng một đường cong elliptic trên trường hữu hạn $F_{37}$ (chỉ cho phép các giá trị số nguyên từ 0 đến 36 cho $x$ và $y$). Phép toán số học trên trường này tuân theo phép chia lấy dư (modular arithmetic) cho cơ số 37 (Hình 4.11).

Để thực hiện phép chia trên trường hữu hạn $F_p$, chúng ta phải tìm phần tử nghịch đảo nhân (multiplicative inverse) của mẫu số $B$ trong trường đó, ký hiệu là $B^{-1}$, sao cho:
$$(B \cdot B^{-1}) \pmod p = 1$$
Phần tử nghịch đảo nhân luôn tồn tại nếu $p$ là một số nguyên tố và có thể được tìm thấy một cách hiệu quả bằng **thuật toán Euclid mở rộng** (Euclidean algorithm) [127].

Sự hiện diện của trường hữu hạn khiến đường cong elliptic không còn là một đường cong continuous nữa, mà trở thành một tập hợp gồm các điểm phân tán rời rạc (Hình 4.12). Trong trường $F_{37}$, đường cong $y^2 = x^3 + 7$ chứa chính xác 39 điểm hợp lệ (bao gồm cả điểm ở vô cực).

Dưới đây là các ví dụ tính toán số học cụ thể trên đường cong $y^2 = x^3 + 7$ trong trường $F_{37}$:

* **Ví dụ 1 (Phép cộng điểm):** Cho hai điểm $P_1 = (24, 17)$ và $P_2 = (35, 6)$. Chúng ta muốn tìm $P_3 = P_1 + P_2$.
  Tính độ dốc $s$:
  $$s = \left[ \frac{y_{P1} - y_{P2}}{x_{P1} - x_{P2}} \right] \pmod p = \left[ (y_{P1} - y_{P2})(x_{P1} - x_{P2})^{-1} \right] \pmod p$$
  $$s = \left[ (17 - 6)(24 - 35)^{-1} \right] \pmod{37} = \left[ (11)(-11)^{-1} \right] \pmod{37}$$
  Nghịch đảo nhân của $-11$ (tương đương với $26$ trong trường $F_{37}$) là $10$ vì $[(-11) \cdot 10] \pmod{37} = -110 \pmod{37} = 1$. Thay giá trị này vào phương trình:
  $$s = [11 \cdot 10] \pmod{37} = 110 \pmod{37} = 36$$
  Bây giờ tính tọa độ của $P_3$:
  $$x_{P3} = [s^2 - (x_{P1} + x_{P2})] \pmod{37} = [36^2 - (24 + 35)] \pmod{37} = [1296 - 59] \pmod{37} = 1237 \pmod{37} = 16$$
  $$y_{P3} = [s(x_{P1} - x_{P3}) - y_{P1}] \pmod{37} = [36(24 - 16) - 17] \pmod{37} = [36 \cdot 8 - 17] \pmod{37} = 271 \pmod{37} = 12$$
  Do đó, chúng ta thu được điểm kết quả $P_3 = (16, 12)$ (Hình 4.13).

* **Ví dụ 2 (Phép cộng điểm):** Cho hai điểm $P_1 = (30, 16)$ và $P_2 = (13, 13)$. Chúng ta muốn tìm $P_3 = P_1 + P_2$.
  Tính độ dốc $s$:
  $$s = \left[ (16 - 13)(30 - 13)^{-1} \right] \pmod{37} = \left[ 3 \cdot 17^{-1} \right] \pmod{37}$$
  Nghịch đảo của $17$ mod $37$ là $24$ vì $(17 \cdot 24) \pmod{37} = 408 \pmod{37} = 1$.
  $$s = [3 \cdot 24] \pmod{37} = 72 \pmod{37} = 35 \equiv -2 \pmod{37}$$
  Tính tọa độ của $P_3$:
  $$x_{P3} = [s^2 - (x_{P1} + x_{P2})] \pmod{37} = [(-2)^2 - (30 + 13)] \pmod{37} = [4 - 43] \pmod{37} = -39 \pmod{37} = 35$$
  $$y_{P3} = [s(x_{P1} - x_{P3}) - y_{P1}] \pmod{37} = [(-2)(30 - 35) - 16] \pmod{37} = [10 - 16] \pmod{37} = -6 \pmod{37} = 31$$
  Do đó, chúng ta thu được điểm $P_3 = (35, 31)$ (Hình 4.14).

* **Ví dụ 3 (Phép nhân đôi điểm):** Cho điểm $P = (8, 1)$. Chúng ta muốn tìm $2P = P + P$.
  Tính độ dốc $s$:
  $$s = \left[ \frac{3x_P^2 + a}{2y_P} \right] \pmod{37} = \left[ (3 \cdot 8^2 + 0)(2 \cdot 1)^{-1} \right] \pmod{37} = \left[ 192 \cdot 2^{-1} \right] \pmod{37}$$
  Phần tử nghịch đảo của $2$ mod $37$ là $19$ vì $(2 \cdot 19) \pmod{37} = 38 \pmod{37} = 1$.
  $$s = [192 \cdot 19] \pmod{37} = 3648 \pmod{37} = 22$$
  Tính tọa độ của $2P$:
  $$x_{2P} = [s^2 - 2x_P] \pmod{37} = [22^2 - 2 \cdot 8] \pmod{37} = [484 - 16] \pmod{37} = 468 \pmod{37} = 24$$
  $$y_{2P} = [s(x_P - x_{2P}) - y_P] \pmod{37} = [22(8 - 24) - 1] \pmod{37} = [22 \cdot (-16) - 1] \pmod{37} = -353 \pmod{37} = 17$$
  Do đó, chúng ta thu được tọa độ cho điểm $2P = (24, 17)$.

---

### 4.3.4 Đường cong Elliptic, Nhóm Cyclic và Chữ ký (Elliptic Curves, Cyclic Groups, and Signatures)

Để thiết lập thuật toán chữ ký số đường cong elliptic (**ECDSA**), chúng ta cần một nhóm con tuần hoàn (cyclic subgroup) dựa trên đường cong elliptic của chúng ta. Nhóm con tuần hoàn được tạo ra bằng cách cộng liên tiếp một điểm cơ sở $G$ với chính nó cho đến khi quay trở lại điểm ở vô cực ($0G$). Nó chứa các phần tử $\{0, G, 2G, 3G, ..., (n-1)G\}$, trong đó $n$ được gọi là **bậc** (order) của nhóm con.

Trong ví dụ đơn giản dưới đây, chúng ta xét một nhóm con tuần hoàn có bậc $n=13$ (13 là một ước số của bậc toàn phần của đường cong là 39), được tạo ra bởi điểm cơ sở $G = (8, 1)$ trên đường cong $y^2 = x^3 + 7$ trong trường $F_{37}$ (Hình 4.15).

#### **Tạo một cặp khóa:**
Không gian khóa của nhóm con này bao gồm các số nguyên từ $1$ đến $n-1$ (tức từ 1 đến 12).
* Giả sử Tamara chọn ngẫu nhiên khóa riêng tư của mình là $k_{prv} = 9$.
* Khóa công khai tương ứng $K_{pub}$ được phái sinh bằng phép nhân điểm:
  $$K_{pub} = k_{prv} \circ G = 9 \circ (8, 1) = (23, 1)$$
  Điểm $(23, 1)$ chính là khóa công khai của cô ấy.

#### **Ký một thông điệp (Signing the Message):**
Đối với máy tính, mọi thông điệp thực chất chỉ là các con số. Giả sử Tamara muốn ký một thông điệp giao dịch biểu diễn bởi số $t=4$ để chuyển một đơn vị Bitcoin cho Edith. Quy trình tạo chữ ký số của cô ấy bao gồm 5 bước:

1. Tamara chọn một số ngẫu nhiên tạm thời $i$ nằm trong khoảng từ 1 đến $n-1$. Số này chỉ được sử dụng duy nhất một lần (gọi là **ephemeral key / nonce**) [15]. Cô ấy chọn $i = 7$.
2. Tamara tính toán tọa độ điểm $P = i \cdot G = 7 \circ (8, 1) = (18, 20)$ (theo các bước tính toán trong phần 4.3.3).
3. Tamara tính toán thành phần thứ nhất của chữ ký, ký hiệu là $r$:
  $$r = x_P \pmod n = 18 \pmod{13} = 5$$
4. Tamara tính toán thành phần thứ hai của chữ ký, ký hiệu là $s$:
  $$s = \left[ i^{-1}(t + r \cdot k_{prv}) \right] \pmod n$$
  Để giải phương trình này, cô ấy cần tìm nghịch đảo nhân của $i=7$ trong trường số nguyên modulo 13. Vì $(2 \cdot 7) \pmod{13} = 14 \pmod{13} = 1$, nghịch đảo của $7$ mod $13$ là $2$. Thay các giá trị vào công thức:
  $$s = [2 \cdot (4 + 5 \cdot 9)] \pmod{13} = [2 \cdot 49] \pmod{13} = 98 \pmod{13} = 7$$
  Do đó, chữ ký số cho thông điệp $t=4$ là cặp số $(r, s) = (5, 7)$.
5. Tamara gửi thông điệp $t=4$ cùng với khóa công khai của mình $K_{pub} = (23, 1)$ và chữ ký số $(5, 7)$ tới các nút mạng.

#### **Xác thực chữ ký của thông điệp (Verifying the Signature):**
Một nút mạng nhận được thông điệp của Tamara và tiến hành kiểm tra tính hợp lệ của chữ ký thông qua 4 bước:

1. Nút mạng tính toán giá trị $u_1$:
  $$u_1 = (s^{-1} \cdot t) \pmod n$$
  Nghịch đảo nhân của $s=7$ mod $13$ là $2$ (vì $2 \cdot 7 \equiv 1 \pmod{13}$).
  $$u_1 = (2 \cdot 4) \pmod{13} = 8$$
2. Nút mạng tính toán giá trị $u_2$:
  $$u_2 = (s^{-1} \cdot r) \pmod n = (2 \cdot 5) \pmod{13} = 10$$
3. Nút mạng tính toán tọa độ điểm $P$:
  $$P = u_1 \circ G + u_2 \circ K_{pub} = 8 \circ (8, 1) + 10 \circ (23, 1)$$
  Thực hiện các phép toán nhân và cộng điểm trên đường cong elliptic, nút mạng thu được tọa độ của điểm $P = (18, 20)$.
4. Chữ ký được coi là hợp lệ nếu điều kiện sau được đáp ứng:
  $$r = x_P \pmod n$$
  Vì $x_P \pmod{13} = 18 \pmod{13} = 5$, và giá trị này chính xác bằng $r = 5$, nút mạng kết luận chữ ký là hoàn toàn hợp lệ. Giao dịch thực sự được khởi tạo bởi người nắm giữ khóa riêng tư tương ứng với khóa công khai $K_{pub} = (23, 1)$ và nội dung thông điệp không hề bị sửa đổi trên đường truyền.

---

## 4.4 Giao dịch (Transactions)

Giao dịch là các thông điệp được truyền đi trên mạng lưới Bitcoin và đóng vai trò như một lệnh chuyển tiền. Chúng là phương thức duy nhất có thể được sử dụng để chuyển quyền sở hữu các đơn vị Bitcoin.

Khi một nút nhận được thông điệp giao dịch, nó sẽ kiểm tra tính hợp lệ của chữ ký mật mã và các điều kiện đi kèm. Nếu hợp lệ, nút sẽ đưa giao dịch vào hàng đợi bộ nhớ tạm thời (**mempool**) và tiếp tục lan truyền nó tới các nút lân cận theo cấp số nhân. Một khi giao dịch được lan truyền rộng rãi, nó không thể bị hủy bỏ hoặc đảo ngược trong điều kiện bình thường [16].

Hệ thống Bitcoin không theo dõi số dư tài khoản theo cách truyền thống, mà thay vào đó sử dụng mô hình **Đầu ra giao dịch chưa chi tiêu** (Unspent Transaction Outputs - **UTXO**). Tất cả các giao dịch trong quá khứ được ghi lại công khai trên blockchain và tạo thành một chuỗi liên kết các UTXO.

---

### 4.4.1 Cấu trúc của một Giao dịch (Structure of a Transaction)

Một giao dịch Bitcoin hợp lệ bao gồm hai thành phần cơ bản (Hình 4.16):
* **Đầu vào (Inputs):** Tham chiếu đến một đầu ra chưa chi tiêu của một giao dịch trước đó (bằng cách chỉ định ID giao dịch trước đó và chỉ số index của đầu ra đó) kèm theo một **chữ ký giải khóa** (scriptSig) đóng vai trò là lời giải cho điều kiện khóa của đầu ra đó.
* **Đầu ra (Outputs):** Xác định số lượng đơn vị Bitcoin được chuyển đi (tính bằng đơn vị satoshi, trong đó $1 \text{ BTC} = 100,000,000 \text{ satoshis}$) và một **script khóa** (scriptPubKey) quy định điều kiện mà người nhận phải đáp ứng để có thể chi tiêu số tiền này trong tương lai.

Đối với mỗi giao dịch, tổng giá trị Bitcoin của tất cả các đầu vào phải luôn lớn hơn hoặc bằng tổng giá trị của tất cả các đầu ra. Phần chênh lệch (nếu có) được coi là **phí giao dịch** (transaction fee) trả cho thợ đào. Mỗi đầu ra chỉ có thể được sử dụng chính xác một lần để làm đầu vào cho một giao dịch mới (Hình 4.17). Nếu một nút nhận được một giao dịch tham chiếu đến một đầu ra đã được chi tiêu trước đó, nó sẽ ngay lập tức từ chối giao dịch đó để chống chi tiêu kép (double-spending).

---

### 4.4.2 Các loại Giao dịch (Types of Transactions)

Vì một UTXO khi được tham chiếu ở đầu vào phải luôn được chi tiêu hoàn toàn (không thể chi tiêu một phần của một UTXO), điều này dẫn đến việc hình thành nhiều loại giao dịch khác nhau để xử lý linh hoạt dòng tiền (Hình 4.18 và 4.19):

* **Giao dịch tích tụ (Aggregating Transaction):** Kết hợp nhiều đầu vào nhỏ ($M > 1$) thành một đầu ra duy nhất ($1$). Loại này giúp người dùng gom các khoản tiền lẻ lại dưới một điều kiện khóa duy nhất.
* **Giao dịch phân tách (Splitting Transaction):** Chia một đầu vào duy nhất ($1$) thành nhiều đầu ra ($N > 1$). Đây là định dạng giao dịch phổ biến nhất. Khi giá trị của đầu vào vượt quá số tiền cần thanh toán thực tế, người gửi sẽ tạo ra hai đầu ra: một đầu ra thanh toán cho người nhận và một đầu ra chuyển số tiền dư còn lại (tiền thừa - change) quay trở lại một địa chỉ mới do chính mình kiểm soát.
* **Giao dịch chuyển tiếp (Forwarding Transaction):** Nhận một đầu vào duy nhất và tạo ra một đầu ra duy nhất để chuyển giao toàn bộ quyền sở hữu (ngoại trừ phí giao dịch).
* **Giao dịch hỗn hợp (Combined Transaction):** Có $M > 1$ đầu vào và $N > 1$ đầu ra, kết hợp cả tính chất phân tách và tích tụ để chuyển tiền cho nhiều người nhận đồng thời hoặc thiết lập các điều kiện ràng buộc phức tạp.

---

### 4.4.3 Tính Truy vết và Tính Khả hoán (Traceability and Fungibility)

Do tính chất liên kết chuỗi của các giao dịch, mọi đầu ra Bitcoin đều có nguồn gốc lịch sử cực kỳ rõ ràng và có thể được truy vết ngược dòng thời gian về tận giao dịch tạo tiền ban đầu của hệ thống là **coinbase transaction** [18].

Tính minh bạch này mang lại khả năng kiểm tra tuyệt đối nhưng cũng đặt ra một số thách thức đối với quyền riêng tư và tính khả hoán (fungibility) của tiền tệ:
* Nếu một chuỗi giao dịch liên quan đến các hoạt động bất hợp pháp hoặc bị hacker tấn công, các đầu ra liên quan có thể bị đưa vào danh sách đen (**blacklisting**). Các sàn giao dịch tập trung có thể từ chối chấp nhận các Bitcoin nằm trong danh sách đen này, khiến giá trị giao dịch thực tế của chúng bị suy giảm so với các Bitcoin "sạch" khác. Điều này phá vỡ tính khả hoán - một thuộc tính quan trọng của tiền tệ quy định rằng mọi đơn vị tiền phải có giá trị tương đương và không thể phân biệt được với nhau.

---

## 4.5 Các Điều kiện Script (Script Conditions)

Các điều kiện khóa một UTXO được viết và xác thực bằng ngôn ngữ **Script**. Đây là một ngôn ngữ lập trình dựa trên ngăn xếp (stack-based), thực thi thông qua danh sách các lệnh định nghĩa trước gọi là **OP codes** (mã vận hành).

Script được thiết kế tối giản và có chủ ý **không đầy đủ Turing** (not Turing-complete) - cụ thể là nó không hỗ trợ các vòng lặp (loops). Sự hạn chế này nhằm ngăn chặn các cuộc tấn công từ chối dịch vụ (DoS) thông qua việc gửi các đoạn script chạy vô hạn làm nghẽn mạng lưới.

Khi một đoạn script được thực thi, nó sử dụng cơ chế ngăn xếp hoạt động theo nguyên lý **vào sau, ra trước** (Last In, First Out - LIFO): các giá trị dữ liệu được đẩy lên đỉnh ngăn xếp, và các hàm vận hành sẽ lấy dữ liệu từ đỉnh ngăn xếp để xử lý. Giao dịch được coi là hợp lệ nếu và chỉ nếu đoạn script kết thúc mà không có lỗi và giá trị nằm trên đỉnh ngăn xếp là **1** (TRUE).

Quy trình xác thực tính hợp lệ của giao dịch dựa trên việc kết hợp hai phân đoạn script (Hình 4.20):
* `scriptSig` (redeem script): Nằm ở đầu vào của giao dịch chi tiêu, chứa chữ ký và các dữ liệu giải khóa.
* `scriptPubKey` (locking script): Nằm ở đầu ra của giao dịch trước đó đang được tham chiếu, quy định điều kiện khóa.

---

### 4.5.1 Thanh toán cho Khóa Công khai (Pay-to-Public Key - P2PK)
Đây là hình thức khóa nguyên bản và hiện đã lỗi thời, phần lớn được thay thế bằng hình thức P2PKH.
* `scriptSig`: `<sig>`
* `scriptPubKey`: `<pubKey> OP_CHECKSIG`

**Quy trình thực thi ngăn xếp (Hình 4.21):**
1. Dữ liệu chữ ký `<sig>` từ `scriptSig` được đẩy lên ngăn xếp.
2. Khóa công khai `<pubKey>` từ `scriptPubKey` được đẩy lên ngăn xếp, nằm phía trên chữ ký.
3. Lệnh `OP_CHECKSIG` được gọi. Nó lấy hai phần tử trên cùng ra khỏi ngăn xếp, sử dụng khóa công khai để xác thực chữ ký. Nếu chữ ký hợp lệ, số `1` (TRUE) được đẩy lên ngăn xếp; ngược lại số `0` (FALSE) được đẩy lên.

---

### 4.5.2 Thanh toán cho Băm Khóa Công khai (Pay-to-Public-Key-Hash - P2PKH)
Đây là hình thức thanh toán phổ biến nhất, liên kết đầu ra trực tiếp với một địa chỉ Bitcoin của người nhận.
* `scriptSig`: `<sig> <pubKey>`
* `scriptPubKey`: `OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`

**Quy trình thực thi ngăn xếp (Hình 4.22):**
1. Chữ ký `<sig>` và khóa công khai `<pubKey>` được đẩy lên ngăn xếp.
2. `OP_DUP` nhân bản khóa công khai nằm trên đỉnh ngăn xếp.
3. `OP_HASH160` lấy khóa công khai trên đỉnh và băm nó bằng SHA256 tiếp nối bởi RIPEMD160 để tạo ra `<computed_pubKeyHash>`.
4. Giá trị `<pubKeyHash>` (địa chỉ đích quy định trong giao dịch gốc) được đẩy lên ngăn xếp.
5. `OP_EQUALVERIFY` so sánh `<computed_pubKeyHash>` với `<pubKeyHash>`. Nếu khớp, cả hai giá trị bị xóa khỏi ngăn xếp và quá trình tiếp tục. Nếu không khớp, script dừng ngay lập tức và giao dịch bị coi là không hợp lệ.
6. Lệnh `OP_CHECKSIG` cuối cùng thực hiện xác thực chữ ký `<sig>` bằng khóa công khai `<pubKey>` tương tự như quy trình P2PK.

---

### 4.5.3 Đa chữ ký (Multisig - M of N)
Điều kiện đa chữ ký yêu cầu phải có tối thiểu $M$ chữ ký hợp lệ từ một tập hợp $N$ khóa công khai cho trước để có thể chi tiêu UTXO.
* `scriptSig`: `OP_0 <sig1> <sig2> ... <sigM>`
* `scriptPubKey`: `<M> <pubKey1> <pubKey2> ... <pubKeyN> <N> OP_CHECKMULTISIG`

**Quy trình thực thi ngăn xếp (Hình 4.23):**
* Lệnh `OP_CHECKMULTISIG` sẽ lấy số lượng khóa công khai $N$ và số lượng chữ ký yêu cầu $M$, sau đó tiến hành so khớp tuần hoàn các chữ ký với các khóa công khai tương ứng từ đỉnh ngăn xếp xuống dưới.
* **Lưu ý kỹ thuật:** Chữ ký đầu tiên ở đầu vào `scriptSig` bắt buộc phải đi kèm với một giá trị trống `OP_0` (dummy) [20]. Đây là một lỗi thiết kế (bug) trong mã nguồn gốc của Satoshi Nakamoto khi lệnh `OP_CHECKMULTISIG` vô tình lấy ra thừa một phần tử từ ngăn xếp. Mặc dù là một lỗi kỹ thuật, nó đã trở thành một quy tắc đồng thuận không thể thay đổi của mạng lưới.

---

### 4.5.4 Thanh toán cho Băm Script (Pay-to-Script-Hash - P2SH)
P2SH là một giải pháp cực kỳ linh hoạt và nén dữ liệu. Thay vì ghi toàn bộ một script khóa phức tạp (như điều kiện đa chữ ký cồng kềnh) vào đầu ra của giao dịch, người gửi chỉ cần ghi băm 20-byte của script đó. Người nhận khi chi tiêu sẽ phải cung cấp toàn bộ script gốc (gọi là redeem script) và các tham số giải khóa tương ứng.
* `scriptSig`: `<unlocking_data> <redeemScript>`
* `scriptPubKey`: `OP_HASH160 <scriptHash> OP_EQUALVERIFY`

**Lợi thế:**
* Giúp tiết kiệm đáng kể không gian lưu trữ của tập hợp UTXO nằm trong RAM của các nút đầy đủ (full nodes).
* Chuyển gánh nặng chi phí lưu trữ và phí giao dịch (phí tính theo byte dữ liệu) từ người gửi sang người nhận (người chi tiêu tiền).
* Cho phép biểu diễn dưới dạng địa chỉ Bitcoin tiêu chuẩn bắt đầu bằng chữ số **3**.

---

### 4.5.5 Giao dịch không chứa dữ liệu chi tiêu (Null Data / OP_RETURN)
Đây không phải là giao dịch thanh toán thực sự, mà được sử dụng để ghi một chuỗi dữ liệu tùy ý có độ dài tối đa 40 bytes (320 bits) vào sổ cái blockchain một cách vĩnh viễn và không thể tẩy xóa.
* `scriptSig`: Không tồn tại
* `scriptPubKey`: `OP_RETURN <data>`

Mã vận hành `OP_RETURN` đánh dấu rõ ràng rằng đầu ra này là **không thể chi tiêu** (unspendable). Nhờ vậy, các nút mạng có thể lập tức loại bỏ đầu ra này khỏi tập hợp UTXO lưu trữ trong RAM, giúp bảo vệ tài nguyên mạng lưới trong khi vẫn cho phép người dùng lưu trữ dữ liệu (ví dụ: băm tài liệu để làm bằng chứng tồn tại - Proof of Existence) trên blockchain vĩnh viễn. Sau này, giới hạn lưu trữ dữ liệu của lệnh này đã được nâng lên 80 bytes ở một số phiên bản cập nhật [54].

---

## 4.6 Các Loại Băm Chữ ký (Signature Hash Type)

Khi ký một giao dịch bằng thuật toán ECDSA, người dùng có thể linh hoạt lựa chọn phần nào của giao dịch sẽ được khóa bằng chữ ký của họ và phần nào có thể được phép sửa đổi bởi những người khác. Điều này được quy định bởi các cờ hiệu **SIGHASH** đi kèm với chữ ký. Có 3 loại cờ hiệu cơ sở và 1 cờ hiệu bổ trợ (Hình thức sửa đổi `ANYONECANPAY`), tạo ra tổng cộng 6 cấu hình ký khác nhau (Bảng 4.2):

#### **Bảng 4.2: Các loại băm chữ ký (SIGHASH)**

| Cờ Hiệu | Tất cả Đầu vào (All Inputs) | Chỉ Đầu vào của Bạn (Only Your Input - `ANYONECANPAY`) |
| :--- | :--- | :--- |
| **Tất cả Đầu ra (All outputs)** | `SIGHASH_ALL` | `SIGHASH_ALL | SIGHASH_ANYONECANPAY` |
| **Một Đầu ra duy nhất (Single output)** | `SIGHASH_SINGLE` | `SIGHASH_SINGLE | SIGHASH_ANYONECANPAY` |
| **Không có Đầu ra (No outputs)** | `SIGHASH_NONE` | `SIGHASH_NONE | SIGHASH_ANYONECANPAY` |

* **`SIGHASH_ALL`:** Ký trên toàn bộ tất cả đầu vào và tất cả đầu ra. Bất kỳ sự thay đổi nào đối với bất kỳ đầu vào hay đầu ra nào cũng sẽ làm chữ ký mất hiệu lực. Đây là cấu hình mặc định phổ biến nhất.
* **`SIGHASH_SINGLE`:** Ký trên tất cả các đầu vào nhưng chỉ ký duy nhất một đầu ra có chỉ số index tương ứng với đầu vào của người ký. Những người khác có thể thoải mái thay đổi hoặc thêm bớt các đầu ra khác.
* **`SIGHASH_NONE`:** Ký trên tất cả các đầu vào nhưng không ký trên bất kỳ đầu ra nào. Bất kỳ ai cũng có thể thay đổi địa chỉ nhận tiền và số tiền phân bổ mà không làm hỏng chữ ký [23].
* **Công cụ sửa đổi `ANYONECANPAY`:** Khi được kết hợp với các cờ cơ sở, nó giới hạn chữ ký chỉ bảo vệ duy nhất đầu vào của chính người ký đó. Người khác có thể thoải mái thêm các đầu vào khác vào giao dịch.
  * **Ứng dụng thực tế:** `SIGHASH_ALL | SIGHASH_ANYONECANPAY` rất hữu ích cho các chiến dịch gọi vốn cộng đồng (crowdfunding). Người dùng cam kết đóng góp một số tiền cụ thể cho một dự án cụ thể (đầu ra cố định), nhưng cho phép bất kỳ ai khác bổ sung thêm các nguồn lực đầu vào khác cho đến khi đạt đủ mục tiêu.

---

## 4.7 Công nghệ Segregated Witness (SegWit)

Segregated Witness (SegWit) là một bản nâng cấp mạng lưới quan trọng được kích hoạt dưới dạng một soft fork vào ngày 21 tháng 7 năm 2017 [146]. Mục tiêu cốt lõi của SegWit là giải quyết triệt để vấn đề **tính dễ uốn của giao dịch** (transaction malleability).

Vấn đề tính dễ uốn bắt nguồn từ việc chữ ký số trong `scriptSig` không thể tự ký chính nó (để tránh vòng lặp vô hạn). Do đó, `scriptSig` phải được loại bỏ khi tạo chữ ký nhưng sau đó lại được đưa vào để tính toán giá trị băm định danh giao dịch (TXID). Kẻ tấn công hoặc các nút trung gian có thể lợi dụng các đặc điểm mã hóa để thay đổi một vài byte dữ liệu trong `scriptSig` mà không làm hỏng tính hợp lệ của chữ ký, nhưng lại làm thay đổi hoàn toàn giá trị băm định danh giao dịch (TXID).

Sự thay đổi TXID này gây ra những hệ lụy nghiêm trọng cho các giải pháp mở rộng quy mô lớp thứ hai như mạng lưới Lightning Network (xem phần 6.2), nơi các chuỗi giao dịch ngoài chuỗi (off-chain) phụ thuộc chặt chẽ vào tính bất biến của các TXID làm tham chiếu.

Để giải quyết vấn đề này, SegWit thực hiện **tách biệt** (segregates) toàn bộ phần dữ liệu chữ ký và redeem script ra khỏi trường `scriptSig` của giao dịch và chuyển chúng sang một cấu trúc dữ liệu độc lập đi kèm gọi là **Trường Nhân chứng** (witness). Trường `scriptSig` ban đầu được để trống khi tính toán giá trị băm định danh giao dịch (TXID). Vì trường trống này không chứa dữ liệu thay đổi, TXID của giao dịch trở nên bất biến và hoàn toàn đáng tin cậy.

---

### 4.7.1 Các nguồn gây ra Tính dễ uốn (Malleability Sources)

Có hai nhóm nguồn chính có thể bị lợi dụng để thay đổi chữ ký mà không làm hỏng tính hợp lệ của nó:

1. **Nguồn dựa trên Chữ ký (Signature-Based):**
   * **Sự mơ hồ trong mã hóa:** Thư viện OpenSSL cũ cho phép mã hóa các giá trị toán học $r$ và $s$ của chữ ký ECDSA theo nhiều cách định dạng khác nhau (Ambiguity) nhưng vẫn được chấp nhận là hợp lệ.
   * **Tính đối xứng của chữ ký:** Trong toán học ECDSA, việc sử dụng giá trị âm của số $s$ (phép toán bù modulo bậc nhóm đường cong $n$) không làm thay đổi tính hợp lệ của chữ ký. Điều này có thể được chứng minh qua ví dụ số học của Tamara trong phần 4.3.4:
     Nếu kẻ tấn công thay đổi giá trị $s$ từ $7$ thành $-7$ (tương đương với $-7 \equiv 6 \pmod{13}$ trong trường bậc 13 của chúng ta):
     * Nghịch đảo nhân của $-7$ mod $13$ là $11$ vì $[(-7) \cdot 11] \pmod{13} = -77 \pmod{13} = 1$. Thay vào các bước kiểm tra chữ ký:
       $$u_1 = (-s^{-1} \cdot t) \pmod{13} = (11 \cdot 4) \pmod{13} = 44 \pmod{13} = 5$$
       $$u_2 = (-s^{-1} \cdot r) \pmod{13} = (11 \cdot 5) \pmod{13} = 55 \pmod{13} = 3$$
       $$P = u_1 \circ G + u_2 \circ K_{pub} = 5 \circ (8, 1) + 3 \circ (23, 1)$$
       Tính toán hình học cho ra kết quả điểm $P = (18, 17)$.
       Kiểm tra điều kiện: $x_P \pmod{13} = 18 \pmod{13} = 5$, giá trị này khớp hoàn hảo với $r=5$. Do đó, chữ ký vẫn hợp lệ nhưng giao dịch sẽ bị gắn một TXID hoàn toàn mới. Lỗ hổng này đã được khắc phục phần lớn bằng việc áp dụng quy tắc mã hóa nghiêm ngặt DER trong tiêu chuẩn BIP0066 [231].

2. **Nguồn dựa trên Mã vận hành (Operation Code-Based):**
   Rất khó để ngăn chặn điều này trong cấu trúc script cũ. Ví dụ, kẻ tấn công có thể chèn thêm cặp lệnh `OP_PUSHDATA` tiếp nối bởi `OP_DROP` vào `scriptSig`. Cặp lệnh này chỉ đơn giản là đẩy một số dữ liệu rác vào ngăn xếp rồi lập tức xóa nó đi, không hề ảnh hưởng đến kết quả thực thi của script khóa nhưng lại làm thay đổi hoàn toàn giá trị băm TXID của giao dịch. SegWit giải quyết triệt để vấn đề này bằng cách chuyển toàn bộ dữ liệu chữ ký sang trường nhân chứng (witness) độc lập không tham gia vào quá trình tính toán băm định danh giao dịch.

---

### 4.7.2 Triển khai dưới dạng Soft Fork (Soft Fork Implementation)

Bản nâng cấp SegWit được triển khai dưới dạng một soft fork tương thích ngược. Đối với các nút cũ không nâng cấp phần mềm:
* Các đầu ra SegWit trông giống như một điều kiện khóa "bất kỳ ai cũng có thể chi tiêu" (anyone-can-spend) vì trường `scriptSig` để trống. Do đó, các nút cũ sẽ chấp nhận giao dịch mà không yêu cầu chữ ký.
* Đối với các nút mới đã nâng cấp, chúng hiểu quy tắc SegWit và sẽ chủ động tìm kiếm dữ liệu chữ ký trong trường nhân chứng (witness data). Chúng chỉ chấp nhận giao dịch nếu trường nhân chứng chứa chữ ký hợp lệ.

Việc triển khai dưới dạng soft fork giúp tránh nguy cơ chia tách mạng lưới thành hai chuỗi khối đối địch và cho phép tận dụng tối đa cơ sở hạ tầng hiện tại mà không bắt buộc tất cả người dùng phải đồng loạt nâng cấp phần mềm cùng một thời điểm.

---

### 4.7.3 Các Loại Giao dịch SegWit (SegWit Transaction Types)

Nâng cấp SegWit giới thiệu các định dạng giao dịch mới hiệu quả hơn:

* **Pay-to-Witness-Public-Key-Hash (P2WPKH):** Phiên bản SegWit của P2PKH. Đoạn script khóa `scriptPubKey` đơn giản chỉ chứa một số hiệu phiên bản (thường là 0) tiếp nối bởi băm 160-bit của khóa công khai nén. Dữ liệu chữ ký được chuyển hoàn toàn sang trường nhân chứng.
* **Pay-to-Witness-Script-Hash (P2WSH):** Phiên bản SegWit của P2SH. Script khóa chứa số hiệu phiên bản 0 tiếp nối bởi băm 256-bit của script khóa [24]. Toàn bộ redeem script gốc được cung cấp trong trường nhân chứng.
* **Giao dịch SegWit lồng ghép P2SH (P2SH Embedded SegWit):** Đây là một giải pháp chuyển tiếp tuyệt vời cho phép người dùng ví SegWit có thể nhận tiền từ những người dùng ví cũ chưa nâng cấp SegWit. Ý tưởng là lồng ghép đoạn mã khóa P2WPKH hoặc P2WSH vào bên trong một khóa P2SH tiêu chuẩn bắt đầu bằng chữ số **3**. Khi đó, người gửi cũ chỉ cần thực hiện giao dịch gửi tiền đến một địa chỉ P2SH thông thường mà không cần biết đến sự tồn tại của SegWit.

---

### 4.7.4 Định dạng Địa chỉ SegWit gốc (Bech32)

Bech32 là định dạng địa chỉ SegWit gốc (native SegWit address format) được đề xuất trong tiêu chuẩn **BIP0173** [232]. Các địa chỉ này có các đặc điểm nhận diện và ưu điểm vượt trội:
* Luôn bắt đầu bằng chuỗi ký tự **`bc1`** (đối với mạng chính thức) hoặc **`tb1`** (đối với mạng thử nghiệm - testnet) [25].
* **Không phân biệt chữ hoa chữ thường (case insensitivity):** Giúp địa chỉ dễ đọc hơn, tránh nhầm lẫn khi sao chép và nhập liệu bằng tay.
* **Mã kiểm tra cực mạnh (BCH Checksum):** Thuật toán mã kiểm tra Bose-Chaudhuri-Hocquenghem đảm bảo phát hiện chính xác mọi lỗi nhập sai tối đa 4 ký tự.
* **Tiết kiệm dung lượng:** Cho phép mã hóa mã QR nhỏ gọn hơn và giảm chi phí tính toán chuyển đổi hệ cơ số so với Base58.

Địa chỉ Bech32 có độ dài 42 ký tự đối với P2WPKH và 62 ký tự đối với P2WSH. Dưới đây là các ví dụ cụ thể dựa trên khóa công khai của Tamara:
* Địa chỉ P2WPKH gốc ($B_{Cpkh}$): `bc1qryqazre3l42dvj8jrg8ed9s6t56aql6puy8wk8`
* Địa chỉ P2WSH gốc ($BC_{sh}$): `bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3`

---

### 4.7.5 Tăng năng lực Xác nhận của Khối (Confirmation Capacity Increase)

Bằng cách di dời dữ liệu chữ ký cồng kềnh (chiếm phần lớn dung lượng của giao dịch) sang trường nhân chứng độc lập, SegWit cho phép tăng số lượng giao dịch thực tế có thể được đóng gói vào trong một khối mà không làm thay đổi giới hạn kích thước khối vật lý 1 MB đối với các nút mạng cũ.

Để quản lý kích thước dữ liệu hợp lý, mạng lưới áp dụng một thước đo mới gọi là **Trọng lượng khối** (block weight) $W$, với giới hạn tối đa được chấp nhận là **4 MB** ($W \le 4$). Trọng lượng khối được tính theo công thức:
$$W := 3 \cdot bs(\text{all-wit}) + bs(\text{all})$$
trong đó:
* $bs(\text{all-wit})$ là dung lượng byte của giao dịch khi đã loại bỏ trường nhân chứng.
* $bs(\text{all})$ là toàn bộ dung lượng byte của giao dịch bao gồm cả trường nhân chứng.

Gọi $\beta \in (0, 1)$ là tỷ lệ phần trăm dữ liệu nhân chứng trong khối. Chúng ta có thể viết lại phương trình trọng lượng khối thành:
$$W = 3 \cdot (1 - \beta) \cdot bs(\text{all}) + bs(\text{all}) = bs(\text{all}) \cdot [3 \cdot (1 - \beta) + 1]$$

Với giới hạn $W \le 4$, dung lượng tối đa của khối dữ liệu thực tế ($bs(\text{all})$) - hay còn gọi là **Năng lực xác nhận** (confirmation capacity) $C$ - được biểu diễn bởi:
$$C = \frac{4}{3 \cdot (1 - \beta) + 1}$$

Sự thay đổi của năng lực xác nhận $C$ theo tỷ lệ dữ liệu nhân chứng $\beta$ được thể hiện qua ba trường hợp (Hình 4.24):
1. **Không có giao dịch SegWit ($\beta = 0$):** Khối lượng dữ liệu thực tế $bs(\text{all})$ giữ nguyên giới hạn tối đa là **1 MB** tương đương hệ thống cũ.
2. **Khối chỉ chứa toàn giao dịch SegWit ($\beta \to 1$):** Về mặt lý thuyết, khi tỷ lệ dữ liệu nhân chứng tiến sát đến 100%, năng lực xác nhận $C$ có thể tiến gần tới giới hạn lý thuyết tối đa là **4 MB** (khi đó kích thước khối thực tế chứa cả chữ ký có thể đạt gần 4 MB).
3. **Trường hợp hỗn hợp ($\beta \in (0, 1)$):** Năng lực xác nhận thực tế dao động phi tuyến tính trong khoảng từ 1 MB đến 4 MB tùy thuộc vào mức độ áp dụng giao dịch SegWit của mạng lưới.

Do đó, việc chuyển đổi sang sử dụng SegWit mang lại lợi ích to lớn cho toàn bộ mạng lưới khi giúp tăng băng thông giao dịch, đồng thời giúp giảm đáng kể phí giao dịch cho các cá nhân do dữ liệu nhân chứng được tính phí rẻ hơn so với dữ liệu giao dịch thông thường.

---

## 4.8 Bài tập thực hành (Exercises)

* **Bài tập 4.1:** Giải thích tại sao hệ thống Bitcoin sử dụng biệt danh và nêu các dạng biệt danh phổ biến nhất.
  * *Gợi ý trả lời:* Bitcoin sử dụng biệt danh để bảo vệ quyền riêng tư của người dùng (tránh liên kết trực tiếp giao dịch công khai với danh tính thực) và vì trong hệ thống phi tập trung không thể xác thực danh tính thực một cách tin cậy. Các dạng biệt danh phổ biến nhất là khóa công khai và các địa chỉ Bitcoin phái sinh từ chúng (địa chỉ Base58Check bắt đầu bằng 1 hoặc 3, địa chỉ Bech32 bắt đầu bằng bc1).
* **Bài tập 4.2:** Giải thích tại sao một người không thể phái sinh khóa riêng tư từ một biệt danh cho trước.
  * *Gợi ý trả lời:* Vì mối liên kết giữa khóa riêng tư và khóa công khai (biệt danh) dựa trên phép nhân điểm trên đường cong elliptic - một phép toán một chiều cực kỳ mạnh mẽ. Việc tìm ngược lại khóa riêng tư từ khóa công khai là Bài toán lôgarit rời rạc trên đường cong elliptic (ECDLP), hiện nay chỉ có thể giải bằng phương pháp vét cạn (brute-force) vốn đòi hỏi thời gian tính toán lớn hơn nhiều lần tuổi thọ của vũ trụ, khiến việc đảo ngược là bất khả thi về mặt kỹ thuật.
* **Bài tập 4.3:** Nêu ít nhất ba định dạng phổ biến được sử dụng để mã hóa các khóa riêng tư.
  * *Gợi ý trả lời:* Hệ nhị phân (Binary), Hệ thập lục phân (Hexadecimal), và định dạng Base58Check (Wallet Import Format - WIF) bắt đầu bằng các tiền tố 5, K, hoặc L.
* **Bài tập 4.4:** Những rủi ro nào xảy ra nếu một người dùng liên tục sử dụng lại cùng một biệt danh?
  * *Gợi ý trả lời:* Việc tái sử dụng địa chỉ làm suy yếu nghiêm trọng quyền riêng tư. Kẻ phân tích chuỗi có thể dễ dàng liên kết tất cả các dòng giao dịch đến và đi của địa chỉ đó, dựng lên chân dung tài chính toàn diện của người sở hữu và từ đó có thể suy ra danh tính thực của họ thông qua các điểm giao dịch liên kết với thế giới thực (như các sàn giao dịch yêu cầu KYC).
* **Bài tập 4.5:** Giải thích quy trình được sử dụng để phái sinh một cách định thức nhiều khóa riêng tư từ một hạt giống ngẫu nhiên duy nhất (random seed).
  * *Gợi ý trả lời:* Ví định thức sử dụng một giá trị seed ban đầu kết hợp với một chỉ số tăng dần $i$. Bằng cách áp dụng một hàm băm mật mã $H(i, s)$ để băm seed $s$ cùng chỉ số $i$, ví tạo ra một chuỗi các giá trị băm độc lập để sử dụng làm các khóa riêng tư tương ứng $k_{i,prv} = H(i, s)$. Từ một seed duy nhất, người dùng có thể phái sinh và khôi phục lại toàn bộ chuỗi khóa mà không cần sao lưu từng khóa riêng lẻ.
* **Bài tập 4.6:** Sử dụng chữ ký từ lời giải của bài toán mẫu trong phần 4.3.4, hãy chỉ ra cách chữ ký vẫn có thể được xác thực thành công nếu bạn thay đổi giá trị của $s$ thành $-s$.
  * *Gợi ý trả lời:* Xem chi tiết chứng minh toán học trong phần 4.7.1. Việc thay đổi giá trị $s$ thành $-s$ modulo bậc nhóm $n$ dẫn đến việc thay đổi giá trị nghịch đảo nhân tương ứng, từ đó làm thay đổi các giá trị trung gian $u_1$ và $u_2$. Phép toán cộng điểm trên đường cong elliptic sẽ dẫn đến một điểm $P$ có tọa độ $y$ đối xứng, nhưng tọa độ $x_P$ vẫn được giữ nguyên không đổi. Do điều kiện xác thực chữ ký của ECDSA chỉ so sánh thành phần $r$ với tọa độ hoành độ $x_P \pmod n$, chữ ký kết quả vẫn hoàn toàn hợp lệ nhưng giao dịch sẽ bị gắn một mã băm định danh TXID khác.
* **Bài tập 4.7:** Phác thảo ba ví dụ về giao dịch và xác định loại giao dịch của chúng dựa trên số lượng đầu vào và đầu ra mà chúng có.
  * *Gợi ý trả lời:*
    1. Giao dịch nhận tiền lương từ nhiều dự án nhỏ: Có 5 đầu vào đại diện cho các UTXO tiền công nhỏ và 1 đầu ra gom tiền về địa chỉ cá nhân -> **Giao dịch tích tụ (Aggregating)**.
    2. Giao dịch mua một tách cà phê có thối lại tiền thừa: Có 1 đầu vào giá trị lớn, tạo ra 2 đầu ra (1 đầu ra trả tiền cho quán cà phê và 1 đầu ra thối lại tiền thừa về địa chỉ change của mình) -> **Giao dịch phân tách (Splitting)**.
    3. Giao dịch chuyển quyền sở hữu toàn bộ tài sản sang ví lạnh mới: Có 1 đầu vào và tạo ra đúng 1 đầu ra chuyển tiếp toàn bộ số tiền sang ví mới -> **Giao dịch chuyển tiếp (Forwarding)**.
* **Bài tập 4.8:** Mô tả một ví dụ về mỗi điều kiện mở khóa sau đây và xác định `scriptPubKey` và `scriptSig` tương ứng của chúng:
  a) **Pay-to-public-key (P2PK):** `scriptSig` chứa chữ ký `<sig>`; `scriptPubKey` chứa khóa công khai `<pubKey> OP_CHECKSIG`.
  b) **Pay-to-public-key-hash (P2PKH):** `scriptSig` chứa chữ ký và khóa công khai `<sig> <pubKey>`; `scriptPubKey` chứa mã băm địa chỉ kèm các lệnh xác thực: `OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`.
  c) **Multisig (M of N):** `scriptSig` chứa một giá trị dummy và các chữ ký yêu cầu: `OP_0 <sig1> ... <sigM>`; `scriptPubKey` quy định số lượng chữ ký và tập hợp khóa công khai: `<M> <pubKey1> ... <pubKeyN> <N> OP_CHECKMULTISIG`.
  d) **Pay-to-script-hash (P2SH):** `scriptSig` chứa các tham số giải khóa và toàn bộ redeem script gốc: `<unlocking_data> <redeemScript>`; `scriptPubKey` chứa băm của redeem script: `OP_HASH160 <scriptHash> OP_EQUALVERIFY`.
  e) **Null data (OP_RETURN):** `scriptSig` không tồn tại; `scriptPubKey` chứa mã lệnh chặn chi tiêu và dữ liệu tùy ý: `OP_RETURN <data_40_bytes>`.
  f) **Pay-to-witness-public-key-hash (P2WPKH):** `scriptSig` để trống; chữ ký và khóa công khai được cung cấp trong trường nhân chứng `witness: <sig> <pubKey>`; `scriptPubKey` chứa phiên bản và băm khóa công khai: `OP_0 <pubKeyHash>`.
  g) **Pay-to-witness-script-hash (P2WSH):** `scriptSig` để trống; dữ liệu giải khóa và redeem script được cung cấp trong trường nhân chứng `witness: <unlocking_data> <witnessScript>`; `scriptPubKey` chứa phiên bản và băm 256-bit của script: `OP_0 <scriptHash256>`.
