# BẢN DỊCH CHƯƠNG 7: CÁC ỨNG DỤNG KHÁC (Further Applications)

Chuỗi khối Bitcoin cung cấp một cơ sở hạ tầng cho phép triển khai nhiều ứng dụng phi tiền tệ. Ngay từ năm 2014, công ty vốn mạo hiểm Ledra Capital đã công bố một danh sách gồm 84 trường hợp sử dụng công nghệ chuỗi khối. Tuy nhiên, việc đi sâu vào từng ngành công nghiệp cụ thể nằm ngoài phạm vi của cuốn sách này. Thay vào đó, chúng tôi muốn giới thiệu cho người đọc các khái niệm cốt lõi nhằm nêu bật những ưu điểm của chuỗi khối công khai và chỉ ra cách chúng có thể được sử dụng một cách độc lập với ngành nghề. Vì vậy, các ví dụ sau đây mang tính đại diện cho tiềm năng của công nghệ này nhưng hoàn toàn không phải là toàn bộ.

Hơn nữa, chúng tôi cố ý giới hạn sự tập trung của mình vào các ứng dụng phi tiền tệ. Các đổi mới liên quan đến tiền tệ như thanh toán giữa máy với máy (machine-to-machine) trong bối cảnh Internet vạn vật (IoT), stablecoins, hoặc các giao dịch vi mô toàn cầu đã được xử lý trong các chương trước.

---

## 7.1 Xác minh và Chứng thực Phi tập trung (Decentralized Verification and Attestation)

Chuỗi khối Bitcoin có thể được xem như một bảng tin công khai (public pinboard) được quản lý theo cách phi tập trung. Nó có thể được sử dụng để bảo vệ bất kỳ loại thông tin nào. Khác với bảng tin thông thường, thông tin sau khi đưa lên chuỗi khối không thể bị xóa bỏ hoặc thay đổi. Thời điểm thông tin được thêm vào chuỗi khối được ghi nhận cùng với thông tin đó và biệt danh (pseudonym) của tác giả.

Các giao dịch dữ liệu rỗng (null data transactions) có thể bao gồm bất kỳ thông tin nào thông qua mã vận hành `OP_RETURN` (xem phần 4.5.5). Mặc dù kích thước dữ liệu có thể thêm vào là tương đối nhỏ, nhưng nó đủ để chứa một giá trị băm (xem phần 4.2). Một khi giá trị băm đã được thêm vào chuỗi khối, nó không thể bị xóa hoặc thay đổi. Các giá trị băm bất biến cho phép bất kỳ ai cũng có thể chứng minh sự tồn tại, tính xác thực và tính toàn vẹn của dữ liệu.

### 7.1.1 Bằng chứng Tồn tại (Existence)
Một "bằng chứng tồn tại" (proof of existence) chứng thực rằng một tài liệu đã tồn tại vào một thời điểm cụ thể. Tài liệu đó không cần phải được tiết lộ công khai. Đối với bằng chứng tồn tại, chỉ cần tính toán giá trị băm của tài liệu đó và đưa nó vào một giao dịch. Cuối cùng, giao dịch sẽ được xác nhận trong một khối và từ đó liên kết với một thời điểm cụ thể.

Giả sử Michèle được một công ty yêu cầu xây dựng một chiến lược kinh doanh mới. Sau khi hoàn thành công việc, cô trình bày các ý tưởng của mình với ban giám đốc công ty và cung cấp một văn bản chứa các kế hoạch của cô. Để ngăn cản các nhà quản lý tuyên bố vào một thời điểm nào đó trong tương lai rằng các ý tưởng đó được phát triển nội bộ, Michèle có thể thêm giá trị băm của bản thảo vào chuỗi khối. Điều này cho phép cô chứng minh rằng văn bản của cô đã tồn tại vào thời điểm khối đó được thêm vào chuỗi khối. Cô có thể tiết lộ bản thảo cho bất kỳ bên thứ ba nào để họ tính toán và xác minh giá trị băm của nó, chứng minh rằng nó khớp với giá trị băm được ghi lại trên chuỗi khối.

Một hàm băm mật mã học (xem phần 4.2) khiến việc tạo ra một tài liệu có giá trị băm cụ thể là bất khả thi về mặt tính toán. Điều này ngụ ý rằng các giá trị băm khớp nhau là bằng chứng đầy đủ cho thấy tài liệu đã tồn tại tại thời điểm giá trị băm của nó được ghi lại trên chuỗi khối. Mặc dù bằng chứng tồn tại không mang lại sự bảo hộ pháp lý tương tự như bằng sáng chế (patent), nó vẫn có nhiều lĩnh vực ứng dụng rất thú vị.

### 7.1.2 Bằng chứng Toàn vẹn (Integrity)
Một ứng dụng khả thi khác là bảo vệ tính toàn vẹn của dữ liệu. Ví dụ, nếu ai đó muốn đảm bảo rằng nội dung của một hợp đồng sẽ không bị thay đổi, họ có thể nhúng giá trị băm của hợp đồng vào chuỗi khối. Mọi thay đổi đối với hợp đồng sẽ tất yếu dẫn đến sự thay đổi giá trị băm của nó, khiến nó không còn khớp với giá trị băm được ghi lại trên chuỗi khối. Mọi hành vi gian lận hoặc sửa đổi sẽ ngay lập tức bị phát hiện.

Phương pháp bảo vệ dữ liệu này có thể được tích hợp vào các quy trình kinh doanh. Ví dụ, giá trị băm của các tài liệu liên quan đến kiểm soát và tuân thủ (controlling and compliance) có thể được thêm định kỳ vào một chuỗi khối công khai. Tính bảo mật của các tài liệu vẫn được đảm bảo vì giá trị băm không tiết lộ nội dung thực tế của dữ liệu.

### 7.1.3 Bằng chứng Xác thực (Authenticity)
Nếu có thể liên kết một khóa công khai với một công ty, một tổ chức hoặc một cá nhân cụ thể, thì việc xác minh tính xác thực của tài liệu cũng hoàn toàn khả thi. Nếu giá trị băm của một tài liệu được ký bởi một tổ chức, chúng ta có thể tin tưởng một cách hợp lý rằng tài liệu đó thực sự được phát hành hoặc được ký bởi chính tổ chức đó.

Trong một dự án chung, Đại học Basel và BlockFactory đã bắt đầu bảo vệ các chứng chỉ học thuật trên một chuỗi khối công khai. Học sinh vượt qua các lớp học liên quan đến chuỗi khối sẽ nhận được một chứng chỉ có thể xác minh công khai. Khi một nhà tuyển dụng tiềm năng nhận được tài liệu, họ có thể tính toán giá trị băm của nó và kiểm tra xem Đại học Basel đã thêm nó vào chuỗi khối hay chưa. Do đó, nhà tuyển dụng có thể tự xác minh sự tồn tại, tính xác thực và tính toàn vẹn của chứng chỉ dựa trên các ghi chép chuỗi khối. Cách tiếp cận này giảm thiểu đáng kể rủi ro lưu hành các chứng chỉ giả mạo mà không bị phát hiện. Các giá trị băm bảo mật mật mã học (và một số yếu tố ngẫu nhiên trong quy trình tạo chứng chỉ) đảm bảo rằng bảo vệ dữ liệu cá nhân không phải là một vấn đề đáng lo ngại, bất chấp tính chất công khai của chuỗi khối.

---

## 7.2 Token và Colored Coins (Tokens and Colored Coins)

Chuỗi khối Bitcoin chỉ cho phép thực hiện các giao dịch bằng đơn vị Bitcoin gốc. Tuy nhiên, vì ngôn ngữ kịch bản (scripting language) của mạng lưới Bitcoin cho phép đính kèm thông tin bổ sung vào một giao dịch, nên một lời hứa thanh toán (promise of payment) có thể được gắn liền với một phân số của đơn vị Bitcoin. Phân số Bitcoin này lúc đó đóng vai trò như một "lớp vỏ bọc" (wrapper) cho phép lời hứa thanh toán được giao dịch trên mạng lưới Bitcoin.

Giá trị kinh tế của một phân số Bitcoin như vậy bắt nguồn từ lời hứa thanh toán đi kèm. Tất nhiên, những lời hứa này phải chịu rủi ro từ phía nhà phát hành (issuer risks). Nếu bên đưa ra lời hứa không thể hoặc không muốn thực hiện nó, lời hứa đó sẽ trở nên vô giá trị. Chuỗi khối Bitcoin không thể cưỡng chế thực thi các lời hứa ngoại chuỗi này; nó chỉ có thể theo dõi xem ai là người sở hữu phân số Bitcoin đó.

Cái gọi là **"colored coins"** (đồng tiền được tô màu) là các phân số Bitcoin được "tô màu" bằng dữ liệu bổ sung đại diện cho một lời hứa thanh toán. Một colored coin có thể hứa hẹn rằng nhà phát hành sẽ trả cho người sở hữu 1,000 USD vào ngày 31 tháng 12 năm 2030. Tùy thuộc vào mức độ uy tín, xếp hạng tín dụng và danh tiếng của nhà phát hành, thị trường sẽ gán một giá trị bổ sung cho phân số Bitcoin này (xem phần 1.4).

Dữ liệu đính kèm có thể chứa bất kỳ loại cam kết nào. Kim loại quý, cổ phần công ty, hoặc nợ chỉ là một vài ví dụ phổ biến. Về cơ bản, bất kỳ loại tài sản nào cũng có thể được hình thành và giao dịch trên chuỗi khối Bitcoin theo cách này. Về mặt công nghệ, chuỗi khối Bitcoin có thể được sử dụng như một cơ sở hạ tầng cơ bản để ghi nhận và theo dõi quyền sở hữu đối với tất cả các loại tài sản. Tuy nhiên, các lo ngại về khả năng mở rộng (scalability) và quy định pháp lý, đặc biệt là trong lĩnh vực luật chứng khoán, sẽ áp đặt những giới hạn nhất định.

Mặc dù colored coins từng có tầm quan trọng nhất định trong những ngày đầu của Bitcoin, ngày nay chúng hiếm khi được sử dụng. Chúng đã được thay thế bằng các **token** được tạo chủ yếu trên chuỗi khối Ethereum. Các token này thường dựa trên tiêu chuẩn token ERC-20. Sự khác biệt chính giữa colored coins và token là token được phát hành thông qua các **hợp đồng token** (token contracts). Các hợp đồng token thực chất là các cơ sở dữ liệu được quản lý trực tiếp trên chuỗi khối.

Mặc dù ERC-20 hiện là tiêu chuẩn token được sử dụng rộng rãi nhất, chúng tôi muốn đề cập rằng có nhiều giải pháp thay thế. Trên chuỗi khối Ethereum, các tiêu chuẩn ERC-223 và ERC-777 giải quyết một số vấn đề có thể xảy ra khi chuyển nhượng token ERC-20, và tiêu chuẩn token ERC-721 cho phép phát hành các tài sản không thể thay thế (nonfungible assets) như các vật phẩm sưu tầm (collectibles). Bên ngoài hệ sinh thái Ethereum, mạng lưới NEO cung cấp tiêu chuẩn token NEP-5. Nhiều chuỗi khối khác cũng có các tiêu chuẩn token của riêng họ. Bản thân các hợp đồng token không thể triển khai trực tiếp trên chuỗi khối Bitcoin do ngôn ngữ kịch bản bị giới hạn của nó. Tuy nhiên, người ta có thể phát hành token trên một sidechain của Bitcoin hoặc trên lớp thứ hai (second layer) như Liquid, Rootstock, hoặc Omni (trước đây là Mastercoin).

---

## 7.3 Tài sản Thông minh (Smart Property)

**Smart property** (tài sản thông minh) là một lời hứa ngoại chuỗi, không gốc (nonnative) được đính kèm vào một phân số Bitcoin hoặc được phát hành dưới dạng một token để có thể giao dịch qua một chuỗi khối. Tuy nhiên, thuật ngữ tài sản thông minh chỉ giới hạn cho các đối tượng vật lý; tức là động sản và bất động sản. Tài sản thông minh liên kết việc sử dụng đối tượng vật lý với các chữ ký mật mã học. Đối tượng vật lý sẽ gửi một thách thức mật mã (cryptographic challenge) đến người muốn sử dụng nó và chỉ cấp quyền truy cập nếu người đó giải được thách thức này.

Một ví dụ phổ biến về đối tượng như vậy là một chiếc ô tô thông minh (smart car). Cửa xe sẽ mở và động cơ sẽ khởi động chỉ dành cho người có thể chứng minh quyền sở hữu khóa riêng tư (private key) thuộc về địa chỉ hiện đang kiểm soát colored coin hoặc token đại diện cho tài sản này.

Các hệ thống khóa dựa trên các nguyên lý mật mã học tương tự đã được sử dụng rộng rãi ngày nay. Tuy nhiên, các thách thức mật mã thường mang tính tĩnh (static), nghĩa là chúng được gắn chặt với một cặp khóa cụ thể. Việc bán tài sản đồng nghĩa với việc các khóa vật lý phải được bàn giao cho chủ sở hữu mới, điều này tiềm ẩn rủi ro là người bán có thể giữ lại các bản sao của khóa. Với công nghệ chuỗi khối, chủ sở hữu mới có thể chọn một khóa mới, cho phép ô tô được giao dịch ảo một cách an toàn. Hơn nữa, nó cho phép cấp quyền truy cập tạm thời, tạo ra các mô hình kinh doanh mới cho nền kinh tế chia sẻ (sharing economy).

Mặc dù quyền sở hữu tài sản thông minh không phải chịu rủi ro đối tác (counterparty risk) theo nghĩa cổ điển, việc vận hành nó đòi hỏi sự tồn tại của một hệ thống pháp luật hoạt động hiệu quả. Bất kỳ biện pháp bảo vệ vật lý nào cho một đồ vật đều có thể bị vượt qua bằng vũ lực. Tương tự như các ổ khóa cửa cơ học, khóa mật mã học chỉ là những rào cản tiếp cận hiệu quả một phần, cần được bảo vệ thêm bởi hệ thống pháp luật. Hơn nữa, nếu quyền tiếp cận vật lý bị từ chối bằng bạo lực, đối tượng vật lý đó sẽ không mang lại giá trị nào cho chủ sở hữu mới, bất chấp việc thay đổi quyền sở hữu đã được đảm bảo bằng mật mã trên chuỗi khối.

> **Hộp 7.1: Sự mất cân bằng do Colored Coins và Tokens gây ra**
> Các đơn vị Bitcoin và Ether được bảo mật bởi một hệ thống khuyến khích (incentives) đơn giản nhưng rất tinh vi. Khi giá trị tài sản tăng lên, phần thưởng thực tế của thợ đào tự động tăng lên. Hệ quả là tỷ lệ băm (hash rate) cũng tăng lên, giúp chuỗi khối trở nên an toàn hơn.
>
> Ngược lại, khi các tài sản ngoại chuỗi (nonnative assets) được liên kết vào chuỗi khối Bitcoin, yêu cầu bảo mật của hệ thống tăng lên rất nhiều, nhưng thù lao của thợ đào vẫn giữ nguyên không đổi. Do đó, colored coins và token về mặt lý thuyết có thể gây ra sự mất cân bằng giữa thù lao của thợ đào và động lực tấn công chuỗi khối của các thế lực xấu.

---

## 7.4 Hợp đồng Chuỗi khối / Hợp đồng Thông minh (Blockchain Contracts / Smart Contracts)

Hiện nay tồn tại một số lượng lớn các nỗ lực định nghĩa mâu thuẫn nhau về thuật ngữ **"blockchain contract"** (hợp đồng chuỗi khối). Thậm chí còn gây nhầm lẫn hơn khi thuật ngữ phổ biến hơn là **"smart contract"** (hợp đồng thông minh) lại dễ gây hiểu lầm. Do đó, chúng tôi sẽ tập trung vào một định nghĩa tối giản, rất rộng rãi để bao quát các khía cạnh của thuật ngữ đã được đồng thuận bởi phần lớn các tài liệu hiện hữu:

> *Hợp đồng chuỗi khối hay hợp đồng thông minh là các chuỗi kịch bản lệnh (scripted sequences) liên kết ít nhất một kết quả đầu ra với các yêu cầu và/hoặc sự kiện cụ thể. Việc hoàn thành các chuỗi lệnh này được đảm bảo bởi chuỗi khối; tức là bởi sổ cái và giao thức đồng thuận.*

### 7.4.1 UTXO như một Hợp đồng Chuỗi khối (UTXO as Blockchain Contracts)
Theo định nghĩa này, mỗi đầu ra giao dịch chưa chi tiêu (UTXO) đều có thể được coi là một hợp đồng chuỗi khối. Mỗi đầu ra giao dịch được bảo vệ bằng các điều kiện khóa (unlocking conditions) (xem phần 4.5). Người đầu tiên trình bày được giải pháp hợp lệ có thể tự do định đoạt số Bitcoin gắn liền với đầu ra đó.

Các điều kiện cụ thể của hợp đồng UTXO thay đổi tùy thuộc vào kịch bản lệnh (script). Pay-to-public-key và pay-to-public-key-hash yêu cầu một chữ ký đi kèm khóa riêng tư đáp ứng các yêu cầu cụ thể. Multisig yêu cầu $M$-trên-$N$ chữ ký hợp lệ, và pay-to-script-hash cho phép mức độ linh hoạt rất cao trong việc định hình các điều khoản hợp đồng. Các chi tiết kỹ thuật liên quan đến điều kiện mở khóa đã được trình bày chi tiết trong phần 4.5. Điều quan trọng cần lưu ý là mô hình UTXO hoàn toàn thỏa mãn định nghĩa về hợp đồng chuỗi khối, và nhiều hợp đồng đơn giản có thể được triển khai trực tiếp trên chuỗi khối Bitcoin bằng cách sử dụng các kịch bản lệnh tiêu chuẩn này.

### 7.4.2 Máy trạng thái và Tài khoản Hợp đồng (State Machines and Contract Accounts)
Mặc dù các UTXO đáp ứng định nghĩa của chúng tôi về hợp đồng chuỗi khối, nhiều người muốn giới hạn thuật ngữ này cho các hệ thống có mức độ linh hoạt cao hơn. Tiêu biểu nhất trong số này là chuỗi khối Ethereum.

Ethereum không sử dụng mô hình UTXO của Bitcoin. Thay vào đó, nó dựa trên mô hình tài khoản (accounts). Mỗi tài khoản được kiểm soát bởi một khóa riêng tư (tài khoản sở hữu bên ngoài - Externally Owned Account hay EOA) hoặc bởi mã code (tài khoản hợp đồng - Contract Account hay CA). Một tài khoản EOA không có nhiều khác biệt so với địa chỉ ví Bitcoin. Về mặt trực giác, nó hoạt động theo những cách tương tự: bất kỳ ai kiểm soát khóa riêng tư của địa chỉ đều có thể thực hiện các giao dịch chuyển tiền từ tài khoản đó.

Các tài khoản CA phức tạp hơn và không tồn tại trong hệ thống Bitcoin. Một tài khoản CA là một tài khoản không được kiểm soát bởi khóa riêng tư. Thay vào đó, nó được điều hành bởi mã bytecode của chính nó. Nó được triển khai bởi một tài khoản EOA (hoặc một CA khác) phát tán một giao dịch tạo hợp đồng bao gồm mã code lên chuỗi khối Ethereum. Một ví dụ đơn giản sẽ là một hợp đồng chấp nhận các khoản thanh toán và ngay lập tức chuyển tiếp chúng theo một lịch trình phân bổ được xác định trước (và được mã hóa trước). Bất cứ khi nào ai đó gửi một giao dịch đến tài khoản hợp đồng này, nó sẽ được kích hoạt và mã code của nó sẽ tự động được thực thi.

Đây tất nhiên là một ví dụ rất đơn giản về tài khoản CA. Nhờ vào tính toàn vẹn Turing (Turing completeness) của Ethereum và khả năng lưu trữ cũng như vận hành trên các biến trạng thái (state variables), các tài khoản CA phức tạp hơn có thể được thiết kế để quản lý toàn bộ các tổ chức (DAOs), mô phỏng các công cụ tài chính phức tạp, hoặc tạo ra các thị trường phi tập trung. Ngay cả các hợp đồng token được đề cập ở phần 7.2 cũng được xây dựng dựa trên các tài khoản CA này. Sự linh hoạt này mở ra tiềm năng to lớn. Tuy nhiên, độ phức tạp tăng lên cũng giới thiệu các vector tấn công mới và có thể làm cho hệ thống dễ bị tổn thương hơn và khó bảo trì hơn. Chúng ta vẫn cần thời gian để xem liệu lợi ích của sự linh hoạt có vượt trội hơn các đánh đổi về mặt an ninh hay không.

### 7.4.3 Thiết kế giao dịch và Hợp đồng ngoại chuỗi (Transaction Design and Off-Chain Contracts)
Chúng ta có thể mở rộng đáng kể phạm vi của các hợp đồng chuỗi khối bằng cách sử dụng các thiết kế giao dịch thông minh. Trong phần 6.2, chúng ta đã tìm hiểu về việc sử dụng các kênh trạng thái (state channels) trong bối cảnh thanh toán vi mô. Các khái niệm tương tự có thể được áp dụng cho các trường hợp sử dụng khác. Mặc dù các mục tiêu có thể rất khác nhau, tất cả các hợp đồng này đều phụ thuộc vào thiết kế giao dịch thông minh và khả năng sử dụng chuỗi khối để giải quyết tranh chấp trong trường hợp xảy ra xung đột.

Hai ví dụ trong đó chúng ta sử dụng thiết kế giao dịch để mô phỏng các hợp đồng trước khi chúng được đưa lên chuỗi khối là **"thỏa thuận mua bán có điều kiện"** (conditional purchase agreements) và **"khoản vay thế chấp"** (collateralized loans). Chúng tôi sẽ giới thiệu các hợp đồng này dưới đây.

#### Thỏa thuận mua bán có điều kiện (Conditional Purchase Agreements)
Chúng ta bắt đầu phân tích với các thỏa thuận mua bán có điều kiện thông qua một ví dụ cụ thể, trong đó Claudia muốn mua một colored coin từ Jake bằng các đơn vị Bitcoin. Hơn nữa, chúng ta giả định rằng colored coin này được phát hành bởi các tác giả cuốn sách và có thể được đổi lấy một bản in vật lý của cuốn sách này.

Giao dịch này tiềm ẩn rủi ro cho cả hai bên. Claudia muốn Jake giao colored coin trước, nhưng Jake lại muốn nhận số Bitcoin của Claudia trước. Trong các hệ thống truyền thống, những vấn đề loại này được giải quyết bởi một dịch vụ trung gian tập trung (escrow) tạm thời giữ khoản thanh toán và sau đó giải phóng nó khi tài sản đã được chuyển giao thành công. Một giải pháp tập trung như vậy là không thỏa đáng trong bối cảnh của một chuỗi khối công khai. Thay vào đó, có một cách tiếp cận thay thế có khả năng giải quyết vấn đề này một cách thanh lịch hơn nhiều.

Hai giao dịch có thể được kết hợp thành một giao dịch Bitcoin duy nhất để tận dụng thực tế là các giao dịch Bitcoin hoạt động theo nguyên lý **nguyên tử** (atomic): hoặc được thực thi hoàn toàn, hoặc không được thực thi gì cả. Điều này loại bỏ khả năng một trong hai bên chiếm đoạt được cả hai tài sản. Về mặt kỹ thuật, một thỏa thuận mua bán có điều kiện được triển khai bằng một giao dịch có hai đầu vào (inputs) và hai đầu ra (outputs).

Trong ví dụ của chúng tôi, trước tiên Claudia tạo ra một "khung vỏ" giao dịch (transaction wrapper) bao gồm tất cả các đầu vào và đầu ra.
*   **Đầu vào thứ nhất** bao gồm số Bitcoin mà Claudia phải chuyển cho Jake.
*   **Đầu vào thứ hai** tham chiếu đến colored coin của Jake.
*   Các **đầu ra mới được tạo ra** sẽ khóa số Bitcoin có lợi cho Jake và khóa colored coin có lợi cho Claudia.

Trong bước thứ hai, Claudia ký vào giao dịch và từ đó hoàn thành điều kiện mở khóa của đầu vào thứ nhất bằng số Bitcoin của mình. Lưu ý rằng giao dịch lúc này vẫn chưa hợp lệ, vì mới chỉ có một trong hai đầu vào không thể tách rời chứa chữ ký hợp lệ. Giao dịch sẽ chỉ được mạng lưới Bitcoin coi là hợp lệ khi Jake cũng ký vào giao dịch đó, sao cho cả hai đầu vào đều chứa chữ ký hợp lệ. Việc chuyển giao số Bitcoin và colored coin sau đó sẽ được thực hiện đồng thời như một phần của cùng một giao dịch duy nhất, loại bỏ hoàn toàn rủi ro đối tác (counterparty risk) khỏi quá trình trao đổi.

#### Khoản vay thế chấp (Collateralized Loans)
Chúng ta hãy xem xét một tình huống trong đó Claudia muốn vay một khoản vay Bitcoin và Brian sẵn sàng cung cấp khoản vay đó với điều kiện có tài sản thế chấp. Tài sản thế chấp của Claudia là một tài sản mã hóa; ví dụ, một colored coin có thể giao dịch trên chuỗi khối Bitcoin.

Một thỏa thuận mua bán có điều kiện, tương tự như ví dụ trước, sẽ gặp vấn đề lớn vì tài sản thế chấp thường có giá trị cao hơn khoản vay rất nhiều. Trong trường hợp này, Brian sẽ có động lực kinh tế để chiếm đoạt tài sản thế chấp đó và không trả lại. Claudia nhận thức được rủi ro này và sẽ chỉ đồng ý ký hợp đồng với điều kiện cô có một sự đảm bảo chắc chắn rằng cô sẽ lấy lại được tài sản thế chấp nếu cô hoàn trả khoản vay đúng hạn. Tình huống này là một ví dụ kinh điển về vấn đề chiếm giữ (hold-up problem).

May mắn thay, có một giải pháp kỹ thuật cho vấn đề này bằng cách liên kết khéo léo các thành phần khác nhau của hệ thống Bitcoin. Ở bước đầu tiên, Claudia và Brian cùng tạo ra một địa chỉ multisig 2-trên-2, ký hiệu là $M$. Địa chỉ này hoạt động như một tài khoản bảo chứng phi tập trung (decentralized escrow account) bảo vệ tài sản của cả hai bên một cách tập thể, tương tự như một tài khoản chung với chữ ký chung. Trước khi Claudia chuyển colored coin sang địa chỉ mới này, cần thực hiện một vài bước để đảm bảo giao dịch vay vốn được diễn ra suôn sẻ:

1.  Claudia tạo ra một giao dịch chuyển colored coin từ địa chỉ $M$ về lại cho Brian. Cô nhúng một hạn chế thời gian (`nLockTime`) vào đó, ngăn cản giao dịch này được xác nhận trước một ngày cụ thể trong tương lai. Cô ký vào giao dịch này và gửi nó cho Brian. Giao dịch này sẽ chỉ được mạng lưới Bitcoin xử lý khi ngày ấn định $t$ đã đến và Brian thêm chữ ký của mình để phát tán lên mạng lưới. (Đây là công cụ phòng ngừa rủi ro cho Brian nếu Claudia quỵt nợ).
2.  Ở bước thứ hai, Brian tạo ra một giao dịch chuyển colored coin từ địa chỉ multisig $M$ về cho Claudia. Ngoài ra, giao dịch này chứa một đầu ra thứ hai ghi nhận số Bitcoin hoàn trả vào địa chỉ của Brian. Đầu ra thứ hai này được thiết lập bằng đúng số tiền vay cộng lãi suất, và nó được định hình sao cho bất kỳ số lượng đầu vào nào tích lũy đủ tổng số tiền đó đều có thể được sử dụng (sử dụng cờ ký bổ trợ `SIGHASH_ANYONECANPAY` - xem phần 4.6). Anh ký vào giao dịch này và gửi cho Claudia. Ở đây cũng vậy, giao dịch chỉ được mạng lưới xử lý khi Claudia bổ sung các đầu vào của mình để trả nợ và đồng ký tên.
3.  Ở bước thứ ba và cũng là bước cuối cùng, cả hai bên cùng tạo ra và ký vào giao dịch gốc nhằm chuyển colored coin thế chấp của Claudia vào địa chỉ $M$, đồng thời chuyển khoản vay Bitcoin từ Brian sang cho Claudia.

Claudia hiện có thể hoàn thành giao dịch vay bất cứ lúc nào và phát tán nó lên mạng lưới Bitcoin. Nếu cô làm điều này, cô nhận được tiền vay, và tài sản thế chấp được khóa an toàn tại địa chỉ $M$. Khi đến hạn, nếu cô muốn lấy lại tài sản thế chấp, cô chỉ cần bổ sung tiền trả nợ vào giao dịch được tạo ở bước 2, ký tên và phát tán nó. Brian sẽ nhận lại được cả vốn lẫn lãi, và Claudia lấy lại được tài sản thế chấp của mình. Nếu Claudia không hoàn trả khoản vay đúng hạn, Brian có thể hoàn thành giao dịch đã ký ở bước 1 bằng cách đồng ký tên sau thời điểm khóa $t$ để thanh lý tài sản thế chấp theo ý muốn.

### 7.4.4 Hệ thống Oracle (Oracles)
Các chuỗi khối có thể dễ dàng xử lý dữ liệu nội chuỗi (native data). Tuy nhiên, nếu một hợp đồng bao gồm các điều kiện phụ thuộc vào dữ liệu bên ngoài, mọi thứ sẽ trở nên khó khăn hơn nhiều. Các ví dụ về dữ liệu bên ngoài bao gồm kết quả thể thao, giá cả thị trường chứng khoán, hoặc dữ liệu quan trắc khí tượng. Các điểm dữ liệu này rõ ràng không thể được quan sát trực tiếp trên chuỗi (on-chain) và đòi hỏi các thực thể trung gian được gọi là **oracles** (hệ thống cung cấp dữ liệu ngoại chuỗi đáng tin cậy).

Mặc dù việc cung cấp loại dữ liệu này cho phép triển khai nhiều ứng dụng thú vị như cá cược hoặc hợp đồng bảo hiểm, việc thực thi hợp đồng phụ thuộc hoàn toàn vào các oracle này. Do đó, quy trình này khó có thể được gọi là phi tập trung hoàn toàn.

Các hợp đồng sử dụng oracle có thể được triển khai theo nhiều cách khác nhau. Ví dụ, cả hai bên tham gia hợp đồng có thể chuyển các đơn vị giá trị được quy định trong hợp đồng đến địa chỉ của một oracle và ghi lại các điều kiện chính xác cần đáp ứng để giải phóng giao dịch. Cấu trúc tổ chức của loại oracle này trên thực tế là một cơ quan trung ương tập trung kiểm soát tài sản và việc thực thi hợp đồng. Trong trường hợp này, oracle có quyền quyết định đơn phương đối với kết quả của hợp đồng và nắm giữ toàn bộ tài sản.

Một cách triển khai thô sơ như thế này dẫn đến 4 vấn đề nghiêm trọng sau:
1.  Oracle đại diện cho một điểm lỗi tập trung (single point of attack), từ đó hủy hoại lợi thế cốt lõi của hệ thống Bitcoin.
2.  Phương pháp thu thập dữ liệu và quy trình ra quyết định của oracle có thể không minh bạch và có thể cung cấp kết quả sai lệch.
3.  Oracle có thể biến mất trước khi hợp đồng được xử lý. Điều này có thể xảy ra nếu máy chủ lưu trữ oracle bị sập hoặc ngừng hoạt động. Hơn nữa, nếu khóa riêng tư của oracle bị mất, tài sản sẽ bị khóa vĩnh viễn trong một hợp đồng không bao giờ có thể xử lý hay thực thi được.
4.  Oracle có thể bị mua chuộc hoặc tham nhũng. Ai đó có thể đưa hối lộ cho oracle để tác động đến việc thực thi hợp đồng hoặc chiếm đoạt tài sản.

Một cách triển khai sử dụng địa chỉ multisig 2-trên-3 mang lại mức độ bảo vệ tốt hơn một chút. Ở đây, ba khóa riêng tư được phân phối giữa hai bên tham gia hợp đồng và oracle. Với thiết lập này, việc thực thi hợp đồng vẫn phụ thuộc vào một dịch vụ tập trung duy nhất. Do đó, oracle vẫn có thể quyết định độc quyền kết quả của hợp đồng, nhưng nó không còn khả năng tự ý giữ lại hoặc tịch thu tài sản của người dùng. Sự ràng buộc này ngăn cản oracle tự gửi số Bitcoin đến một địa chỉ hoàn toàn khác của chính nó. Ngoài ra, cả hai bên hợp đồng có thể tự thương lượng để đạt được thỏa thuận chung và cùng quản lý tài sản bị khóa mà không cần oracle. Nếu vì lý do nào đó mà oracle không thể liên lạc được nữa, số Bitcoin vẫn có thể được thu hồi thông qua sự đồng thuận chữ ký của hai bên đối tác. Cách triển khai này giải quyết hoàn toàn vấn đề thứ 3 và giải quyết một phần vấn đề thứ 4.

Một giải pháp thậm chí còn tốt hơn là sử dụng nhiều oracle đồng thời — ví dụ, bảy oracle khác nhau và một điều kiện mở khóa multisig 8-trên-15 (được ghi nhận trong một điều kiện mở khóa pay-to-script-hash). Bốn khóa riêng tư được gán tương ứng cho hai bên hợp đồng (mỗi bên giữ 2 khóa). Bảy khóa còn lại thuộc sở hữu của bảy oracle độc lập. Cả hai lợi thế của cách triển khai trước đó cũng được áp dụng ở đây. Nếu có nhiều hơn một nửa số oracle không khả dụng, hai bên hợp đồng vẫn có thể tự giải phóng tài sản khi đồng thuận. Mặt khác, các oracle không trực tiếp kiểm soát và do đó không thể tịch thu tài sản.

Sự phi tập trung hóa một phần này làm cho hành vi tham nhũng trở nên khó khăn hơn nhiều và loại bỏ các lỗ hổng liên quan đến một điểm tấn công duy nhất. Về mặt lý thuyết, các oracle vẫn có thể thông đồng với nhau để thay đổi kết quả hợp đồng. Tuy nhiên, điều này đòi hỏi một số lượng lớn các bên thứ ba phải hợp tác chặt chẽ và chấp nhận mạo hiểm toàn bộ danh tiếng hoạt động của họ.

Để triển khai một hệ thống loại này với các điều kiện mở khóa multisig $m$-trên-$n$, người ta có thể tự do điều chỉnh số lượng oracle miễn là các ràng buộc sau được đáp ứng: Mỗi bên trong hai bên hợp đồng nắm giữ $\frac{m}{2}$ khóa riêng tư. Ngoài ra, có $m-1$ oracle độc lập, mỗi oracle nắm giữ đúng một khóa riêng tư. Cách triển khai này thường liên quan đến cấu trúc multisig $m$-trên-$(2m-1)$, với điều kiện ràng buộc là $m$ phải là một số chẵn.

Việc sử dụng các oracle có thể được coi là đi ngược lại với ý định ban đầu của các hợp đồng chuỗi khối hoàn toàn phi tập trung. Tuy nhiên, xem xét phạm vi ứng dụng cực kỳ đa dạng và thú vị của chúng, các loại hợp đồng này rõ ràng vẫn có một tương lai rất tươi sáng.

---

## 7.5 Bài tập (Exercises)

*   **Bài tập 7.1:** Trong quá trình viết cuốn sách này, các tác giả đã sử dụng chuỗi khối Bitcoin để bảo vệ các ý tưởng và văn bản của họ. Hãy phác thảo quy trình cần thực hiện để bảo vệ thông tin đó và xác định các lợi ích mà các tác giả nhận được từ quy trình này.
*   **Bài tập 7.2:** Hãy đưa ra một ví dụ thực tế cho thấy mỗi ứng dụng phi tiền tệ sau đây của chuỗi khối Bitcoin có thể được sử dụng hiệu quả: (1) bằng chứng tồn tại (proof of existence), (2) bằng chứng toàn vẹn (proof of integrity), và (3) bằng chứng xác thực (proof of authenticity).
*   **Bài tập 7.3:** Giải thích khái niệm rủi ro đối tác (counterparty risk) trong bối cảnh sử dụng colored coins và các token.
*   **Bài tập 7.4:** Tài sản thông minh (smart property), theo định nghĩa, không phải chịu rủi ro đối tác theo nghĩa cổ điển của nó. Hãy giải thích những nơi bạn nhìn thấy rủi ro tiềm ẩn và chỉ ra sự khác biệt giữa tài sản thông minh với các tài sản giao thức gốc như Bitcoin.
*   **Bài tập 7.5:** Hãy nêu một vài ví dụ về hợp đồng chuỗi khối (blockchain contracts) và chỉ ra các ưu điểm của việc xử lý hợp đồng trên chuỗi khối so với các quy trình không dựa trên chuỗi khối truyền thống.
*   **Bài tập 7.6:** Giải thích tại sao các hợp đồng phụ thuộc vào các điều kiện bên ngoài thực tế chỉ có thể được coi là hợp đồng chuỗi khối một phần.
