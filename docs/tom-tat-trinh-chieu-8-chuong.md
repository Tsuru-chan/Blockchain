# TÓM TẮT TOÀN DIỆN 8 CHƯƠNG PHỤC VỤ TRÌNH CHIẾU
## Giáo trình: Bitcoin, Blockchain, and Cryptoassets: A Comprehensive Introduction

---

# CHƯƠNG 1: BỐI CẢNH CỦA LÝ THUYẾT TIỀN TỆ (MONETARY THEORY)

## Slide 1: Đặt vấn đề – Tiền tệ dưới góc nhìn "Trí nhớ xã hội"
*   **Bản chất của tiền:** Trong lý thuyết tiền tệ hiện đại, **tiền được định nghĩa là "trí nhớ" (memory)** của nền kinh tế.
*   **Cơ chế vận hành:** 
    *   *Xã hội nhỏ:* Con người trao đổi bằng mối quan hệ "tặng quà" và tự ghi nhớ công sức, đóng góp của nhau. Sự đồng thuận dựa trên lòng tin trực tiếp.
    *   *Xã hội lớn & ẩn danh:* Lòng tin trực tiếp biến mất. **Tiền xuất hiện như một công cụ lưu trữ trí nhớ chung**, ghi nhận đóng góp và đặc ân giữa những người xa lạ.
*   **Thách thức kỷ nguyên số:** Khi số hóa tiền tệ, tệp tin dữ liệu dễ dàng bị sao chép vô hạn. Điều này tạo ra **bài toán chi tiêu kép (double-spending)**.

## Slide 2: Nguồn gốc và Chức năng của Tiền tệ
*   **Thuyết tiến hóa Carl Menger:** Tiền tệ không ra đời do sắc lệnh chính phủ, mà **tiến hóa tự phát** từ thị trường tự do. Một hàng hóa có tính thanh khoản cao nhất dần được xã hội đồng thuận chọn làm vật trung gian trao đổi.
*   **Ba chức năng nền tảng:**
    1.  **Phương tiện trao đổi (Medium of Exchange):** Giải quyết thế bế tắc "sự trùng hợp ngẫu nhiên về nhu cầu" (double coincidence of wants). Giảm số lượng cặp giao dịch cần theo dõi từ \(n(n-1)/2\) xuống còn \(n-1\).
    2.  **Đơn vị hạch toán (Unit of Account):** Thước đo chuẩn hóa để định giá mọi hàng hóa khác.
    3.  **Lưu trữ giá trị (Store of Value):** Công cụ dịch chuyển sức mua từ hiện tại sang tương lai.

## Slide 3: Bảy thuộc tính của Tiền & Ba thành phần Giá trị
*   **7 thuộc tính của tiền hiệu quả:** Khả năng lưu trữ (không hư hỏng), tính chuyển nhượng (dễ vận chuyển), khả năng chia nhỏ, tính đồng nhất (fungibility), khả năng xác thực (chống giả), tính khan hiếm và tính ổn định giá trị.
*   **Mô hình định giá ba thành phần:**
    \[\text{Giá trị thị trường} = \text{Giá trị nội tại} + \text{Cam kết thanh toán} + \text{Phụ phí thanh khoản}\]
*   **Phân loại tiền tệ:**
    *   *Tiền hàng hóa (Commodity Money):* Có giá trị nội tại lớn (ví dụ: vàng).
    *   *Tiền tín dụng (Credit Money):* Dựa vào cam kết thanh toán (IOU), chịu rủi ro tín dụng của tổ chức phát hành (ví dụ: tiền gửi ngân hàng).
    *   *Tiền pháp định (Fiat Money):* Không có giá trị nội tại lẫn cam kết thanh toán, giá trị hoàn toàn dựa trên **phụ phí thanh khoản** và niềm tin chung.

## Slide 4: Cơ cấu kiểm soát – Quy trình tạo tiền
*   **Khai thác cạnh tranh (Competitive Creation):**
    *   Bất kỳ ai cũng có thể tham gia đúc/tạo tiền (ví dụ: đào vàng).
    *   Đạt trạng thái cân bằng khi chi phí biên bằng doanh thu biên (\(MC = MR\)). Bảo vệ sức mua nhờ chi phí vật lý thực tế.
*   **Độc quyền tạo tiền (Monopolistic Creation):**
    *   Quyền phát hành tập trung vào một tổ chức duy nhất (Ngân hàng Trung ương).
    *   Tiết kiệm chi phí xã hội nhờ chi phí đúc tiền cực thấp so với mệnh giá (tạo ra lợi nhuận đúc tiền - *seigniorage*).
*   **Rủi ro hệ thống:** Tạo ra các **"hũ mật" (honey pots)** tập trung quyền lực, dễ bị lạm dụng in tiền vô tội vạ dẫn đến lạm phát phi mã và tước đoạt tài sản của người dân.

## Slide 5: Hình thức đại diện & Xử lý giao dịch
*   **Hình thức biểu diễn (Representation):**
    *   *Vật lý (Physical):* Cầm nắm trực tiếp, giao dịch ẩn danh nhưng giới hạn địa lý.
    *   *Ảo (Virtual):* Thể hiện qua các bút toán ghi sổ cái (ví dụ: Hệ thống tiền đá Yap - sở hữu dựa trên sự thừa nhận của cộng đồng).
*   **Phương thức xử lý giao dịch (Transaction Processing):**
    *   *Tập trung (Centralized):* Giao sổ cái cho bên thứ ba quản lý. Hiệu quả cao nhưng rủi ro kiểm duyệt và lạm quyền lớn.
    *   *Phi tập trung (Decentralized):* Người dùng tự cập nhật sổ cái. Gặp rào cản kỹ thuật là **Bài toán các vị tướng Byzantine** (đồng thuận trong môi trường không tin cậy).
*   **Lối thoát Bitcoin:** Bitcoin kết hợp xuất sắc thuộc tính **đại diện ảo**, **xử lý giao dịch phi tập trung** và **tạo tiền mang tính cạnh tranh** để giải quyết thế tiến thoái lưỡng nan này.

---

# CHƯƠNG 2: TỔNG QUAN VỀ BITCOIN (BITCOIN OVERVIEW)

## Slide 1: Khái niệm và Định vị của Bitcoin
*   **Định nghĩa:** Bitcoin là một hệ thống tiền mặt điện tử ngang hàng (P2P), cho phép chuyển tiền trực tiếp giữa các bên mà không cần qua tổ chức tài chính trung gian.
*   **Đề xuất giá trị độc nhất (USP):** Thiết lập một môi trường giao dịch phi tập trung **không cần lòng tin (trustless)** dựa trên toán học và mật mã học thay vì lòng tin vào con người hay thể chế pháp lý.
*   **Sự khác biệt với tiền đá đảo Yap:** Cả hai đều là tiền ảo (dựa trên sổ cái ghi nhớ sở hữu), nhưng hệ thống đá Yap dựa vào **ràng buộc xã hội áp đặt bởi bộ tộc**, trong khi Bitcoin dựa vào **ràng buộc toán học bất biến toàn cầu**.

## Slide 2: Năm thành phần cốt lõi của Bitcoin
1.  **Đơn vị tiền tệ (Bitcoin unit):** Đồng tiền kỹ thuật số khan hiếm, giới hạn tối đa 21 triệu đồng, chia nhỏ được đến 8 chữ số thập phân (gọi là *Satoshi*).
2.  **Mạng ngang hàng (Peer-to-Peer Network):** Mạng lưới phân tán, không có nút trung tâm, mọi nút đều bình đẳng và kết nối trực tiếp với nhau.
3.  **Giao thức truyền thông (Communication Protocol):** Bộ quy tắc chuẩn hóa cách các nút trao đổi dữ liệu giao dịch và khối.
4.  **Mật mã học bất đối xứng (Asymmetric Cryptography):** Sử dụng các cặp khóa để xác định quyền sở hữu và ký duyệt giao dịch chống giả mạo.
5.  **Chuỗi khối (Blockchain):** Sổ cái công khai lưu trữ toàn bộ lịch sử giao dịch dưới dạng chuỗi các khối liên kết chặt chẽ bằng mật mã.

## Slide 3: Cơ chế hoạt động kỹ thuật sơ lược
*   **Gửi giao dịch:** Người gửi dùng **Khóa riêng tư (Private Key)** ký lên giao dịch và phát tán vào mạng lưới.
*   **Lan truyền mạng:** Các nút kiểm tra tính hợp lệ của chữ ký thông qua **Khóa công khai (Public Key)** và lan truyền thông tin.
*   **Xác nhận (Mining):** Thợ đào gom các giao dịch hợp lệ vào khối mới, giải quyết bài toán toán học phức tạp (**Proof of Work - PoW**) để tìm số *Nonce*.
*   **Quy tắc đồng thuận:** Khối hợp lệ đầu tiên được tìm thấy sẽ được phát sóng. Mạng lưới tự động thừa nhận và tiếp tục đào trên **chuỗi dài nhất (longest chain)** chứa nhiều công sức tính toán nhất.

## Slide 4: Lịch sử ra đời – Các tiền đề kỹ thuật
*   **Các nỗ lực thất bại trong quá khứ:**
    *   *DigiCash (David Chaum):* Ẩn danh tuyệt vời nhưng lại vận hành tập trung nên phá sản khi công ty sụp đổ.
    *   *b-money (Wei Dai) & Bit Gold (Nick Szabo):* Giới thiệu ý tưởng tiền kỹ thuật số dựa trên giải toán (PoW) nhưng chưa giải quyết triệt để bài toán đồng thuận phi tập trung.
*   **Sự kiện Satoshi Nakamoto (2008):** Công bố Sách trắng (Whitepaper) Bitcoin vào ngày 31/10/2008, chính thức khởi chạy mạng lưới vào ngày 03/01/2009 với khối Genesis (khối 0) chứa thông điệp châm biếm gói cứu trợ ngân hàng của chính phủ Anh.

## Slide 5: Quản trị mạng lưới và Cơ chế Fork
*   **Cơ chế cải tiến:** Thông qua tài liệu kỹ thuật **BIP (Bitcoin Improvement Proposal)** thảo luận công khai trong cộng đồng.
*   **Phân loại Fork (Sự phân tách chuỗi):**
    *   **Soft Fork (Tương thích ngược):** Thắt chặt quy tắc. Các nút cũ vẫn chấp nhận các khối do nút mới tạo ra (ví dụ: SegWit).
    *   **Hard Fork (Không tương thích ngược):** Nới lỏng quy tắc. Tạo ra hai chuỗi song song không tương thích nếu cộng đồng không đạt đồng thuận tuyệt đối (ví dụ: Sự phân tách tạo ra Bitcoin Cash năm 2017).
    *   **Forced Fork (Phân tách cưỡng bức):** Do thợ đào hoặc người dùng ép buộc thay đổi quy tắc hệ thống.

---

# CHƯƠNG 3: KHẢ NĂNG XỬ LÝ GIAO DỊCH (TRANSACTIONAL CAPACITY)

## Slide 1: Bản chất của Mạng lưới P2P phi tập trung
*   **Kiến trúc liên kết tự do:** Mạng lưới P2P của Bitcoin cho phép bất kỳ máy tính nào cũng có thể tham gia hoặc rời bỏ mạng lưới tự do mà không làm gián đoạn hệ thống.
*   **Khả năng chống kiểm duyệt:** Không có thực thể trung tâm quản lý nghĩa là không có "điểm chết duy nhất" (Single Point of Failure). Các chính phủ không thể đóng cửa mạng lưới vì nó phân tán trên hàng vạn nút toàn cầu.
*   **Giả định không tin cậy:** Các nút ngang hàng không cần tin tưởng nhau. Mỗi nút đều hoạt động độc lập và phải tự xác thực lại mọi thông tin nhận được để phòng ngừa thông tin giả mạo.

## Slide 2: Phân loại Nút mạng và "Hàng hóa công cộng"
*   **Ba vai trò cơ bản của một nút:**
    1.  *Xác thực (Verification):* Kiểm tra tính hợp lệ của giao dịch và khối.
    2.  *Lưu trữ khóa (Wallet):* Quản lý khóa riêng tư và tạo giao dịch.
    3.  *Sản xuất khối (Mining):* Tìm khối mới.
*   **Nút đầy đủ (Full Nodes):** Thực hiện đầy đủ cả 3 vai trò, đặc biệt là lưu trữ toàn bộ lịch sử Blockchain và tự mình xác thực độc lập.
*   **Bi kịch của tài sản chung (Tragedy of the Commons):** Việc vận hành nút đầy đủ tốn kém tài nguyên (băng thông, dung lượng ổ cứng) nhưng không được trả thưởng trực tiếp. Đây là một dạng **hàng hóa công cộng (common good)**, dẫn đến việc số lượng nút đầy đủ có xu hướng sụt giảm theo thời gian.

## Slide 3: Giải pháp giảm tải mạng (SPV & Subnetworks)
*   **Mạng con tập trung (Centralized Subnetworks):** Sử dụng các dịch vụ ví lưu ký (custodial wallets) hoặc sàn giao dịch. Tiện lợi, không cần tải blockchain nhưng người dùng mất quyền tự kiểm soát khóa riêng tư (chỉ nắm giữ giấy nợ IOU).
*   **Xác thực thanh toán đơn giản hóa (SPV):**
    *   Dành cho thiết bị di động có cấu hình yếu.
    *   Chỉ tải về tiêu đề khối (Block Header - 80 bytes mỗi khối) thay vì toàn bộ khối dữ liệu lớn.
    *   Xác thực dựa vào **độ sâu của khối** và truy vấn thông tin giao dịch qua **Bộ lọc Bloom (Bloom Filters)** để bảo vệ quyền riêng tư cá nhân khi yêu cầu dữ liệu từ nút đầy đủ.

## Slide 4: Giao thức truyền thông & Mempool
*   **Cơ chế đồng bộ hóa khối (Block Synchronization):** Các nút sử dụng các thông điệp `getblocks`, `inv` (danh mục chứa tối đa 500 mã định danh khối), và `getdata` để cập nhật chuỗi khối còn thiếu một cách tối ưu.
*   **Cơ chế truyền phát giao dịch (Transaction Propagation):** 
    *   Giao dịch mới được gửi bằng thông điệp `tx`.
    *   Các giao dịch chưa được thợ đào xác nhận sẽ xếp hàng chờ tại **Mempool** (vùng nhớ đệm tạm thời của mỗi nút).
    *   Các giao dịch có mức phí (fee) cao hơn sẽ được ưu tiên chọn vào khối mới trước để tối ưu hóa doanh thu cho thợ đào.

## Slide 5: Khai thác ích kỷ (Selfish Mining)
*   **Định nghĩa:** Một chiến thuật lý thuyết trò chơi trong đào coin, nơi một thợ đào hoặc mỏ đào phát hiện ra khối hợp lệ nhưng **cố tình giữ bí mật**, không công bố cho mạng lưới.
*   **Mục tiêu:** Ép đối thủ lãng phí năng lực tính toán để đào trên chuỗi cũ vô ích, trong khi thợ đào ích kỷ âm thầm xây dựng chuỗi dài hơn để giành toàn bộ phần thưởng khối sau đó.
*   **Ngưỡng rủi ro:** Hành vi này chỉ bắt đầu mang lại lợi nhuận vượt trội khi nhóm thợ đào ích kỷ kiểm soát từ **1/3 (khoảng 33%)** tổng công suất băm toàn mạng trở lên.

---

# CHƯƠNG 4: TÍNH HỢP LỆ CỦA GIAO DỊCH (TRANSACTIONAL LEGITIMACY)

## Slide 1: Tính ẩn danh qua Biệt danh (Pseudonyms)
*   **Cơ chế biệt danh:** Bitcoin không sử dụng tên thật hay số định danh cá nhân. Danh tính người dùng được đại diện bằng các **địa chỉ Bitcoin** (một dạng biệt danh).
*   **Quy trình phái sinh địa chỉ từ Khóa riêng tư:**
    1.  *Khóa riêng tư (Private Key - d):* Một số ngẫu nhiên 256-bit cực kỳ bảo mật.
    2.  *Khóa công khai (Public Key - Q):* Tính từ khóa riêng tư qua phép nhân điểm đường cong elliptic: \(Q = d \times G\). Phép toán một chiều bất khả nghịch.
    3.  *Địa chỉ Bitcoin:* Tạo ra từ khóa công khai qua cơ chế băm kép: \(\text{RIPEMD-160}(\text{SHA-256}(Q))\), sau đó mã hóa sang định dạng dễ đọc **Base58Check** để tránh nhầm lẫn ký tự.

## Slide 2: Công nghệ Ví định thức phân cấp (HD Wallets)
*   **Ví phi định thức (Nondeterministic Wallet):** Tạo các khóa ngẫu nhiên độc lập. Gặp bất tiện lớn vì người dùng phải sao lưu ví liên tục mỗi khi tạo địa chỉ mới để tránh mất tiền.
*   **Ví định thức phân cấp (Hierarchical Deterministic - HD Wallets):**
    *   **Tiêu chuẩn BIP39:** Tất cả các khóa riêng tư và địa chỉ đều được phái sinh từ một chuỗi từ khóa khôi phục (**Mnemonic Seed** - thường gồm 12 hoặc 24 từ tiếng Anh dễ nhớ). Người dùng chỉ cần sao lưu chuỗi từ này một lần duy nhất.
    *   **Tiêu chuẩn BIP44:** Định nghĩa cấu trúc phân cấp cây khóa chuyên nghiệp hỗ trợ quản lý đa tài khoản, đa chuỗi coin trong cùng một ví.

## Slide 3: Toán học Đường cong Elliptic secp256k1
*   **Mô hình toán học:** Bitcoin sử dụng đường cong elliptic được định nghĩa bởi phương trình:
    \[y^2 = x^3 + 7 \pmod{p}\]
    Trong đó \(p\) là một số nguyên tố cực lớn gần bằng \(2^{256}\).
*   **Các phép toán trên trường hữu hạn Galois:**
    *   *Phép cộng hai điểm (Point Addition):* Tìm giao điểm của đường thẳng đi qua hai điểm với đường cong, rồi lấy đối xứng qua trục hoành.
    *   *Phép nhân đôi một điểm (Point Doubling):* Sử dụng đường tiếp tuyến tại điểm đó để tìm điểm tiếp theo.
*   **Tính an toàn mật mã:** Việc đảo ngược phép toán tìm \(d\) khi biết \(Q\) và \(G\) gọi là Bài toán Logarit rời rạc trên Đường cong Elliptic (ECDLP) - hoàn toàn bất khả thi với công nghệ máy tính hiện tại.

## Slide 4: Mô hình UTXO (Unspent Transaction Output)
*   **Bản chất:** Bitcoin không sử dụng mô hình số dư tài khoản giống như ngân hàng truyền thống. Sổ cái Bitcoin chỉ lưu trữ một tập hợp các **Đầu ra giao dịch chưa chi tiêu (UTXO)**.
*   **Cơ chế chuyển tiền:**
    *   Mỗi giao dịch sẽ tiêu hủy các UTXO cũ (đầu vào - Inputs) và tạo ra các UTXO mới (đầu ra - Outputs) gán cho địa chỉ người nhận.
    *   Phần chênh lệch giữa tổng giá trị đầu vào và tổng giá trị đầu ra chính là **phí giao dịch** tự động trả cho thợ đào.
*   **Tính riêng tư và khả hoán (Fungibility):** Việc di chuyển dòng tiền qua các UTXO tạo ra tính truy vết chuỗi rất cao, cho phép các cơ quan phân tích dữ liệu theo dõi nguồn gốc tiền tệ, gây đe dọa đến tính khả hoán của đồng tiền nếu xuất hiện danh sách đen (blacklists).

## Slide 5: Ngôn ngữ Script và các Điều kiện Khóa
*   **Ngôn ngữ Script:** Ngôn ngữ lập trình dựa trên ngăn xếp (stack-based), thực thi từ trái qua phải, không có vòng lặp (non-Turing complete) để đảm bảo an toàn tuyệt đối, tránh lỗi treo mạng (Halting problem).
*   **Các loại điều kiện khóa phổ biến:**
    *   *P2PKH (Pay-to-Public-Key-Hash):* Khóa bằng mã băm khóa công khai của người nhận. Người nhận mở khóa bằng cách cung cấp khóa công khai và chữ ký số tương ứng.
    *   *Multisig (Đa chữ ký M-of-N):* Yêu cầu phải có ít nhất \(M\) chữ ký trong số \(N\) khóa công khai được cấu hình trước mới có thể chi tiêu tiền.
    *   *P2SH (Pay-to-Script-Hash):* Người gửi gửi tiền vào mã băm của một tập lệnh phức tạp (Redeem Script). Người nhận chịu trách nhiệm cung cấp tập lệnh gốc và dữ liệu mở khóa, giúp người gửi tiết kiệm đáng kể phí giao dịch.

## Slide 6: Giải pháp Segregated Witness (SegWit)
*   **Lỗi tính dễ uốn giao dịch (Transaction Malleability):** Trong cấu trúc Bitcoin cũ, chữ ký số nằm trong trường `scriptSig`. Bên thứ ba hoặc thợ đào có thể thay đổi cấu trúc chữ ký mà không làm mất tính hợp lệ của nó, dẫn đến việc mã định danh giao dịch (TXID) bị thay đổi trước khi được đóng khối.
*   **Giải pháp SegWit (BIP141):**
    *   Tách biệt hoàn toàn phần dữ liệu chữ ký (Witness) ra khỏi phần thông tin giao dịch cơ bản.
    *   Giữ nguyên mã TXID bất biến, mở đường cho việc xây dựng các giải pháp lớp thứ hai an toàn như Mạng lưới Lightning.
    *   **Địa chỉ Bech32 (SegWit gốc):** Bắt đầu bằng `bc1`, tối ưu hóa hiệu năng, giảm lỗi nhập liệu và tiết kiệm phí giao dịch đáng kể cho người dùng nhờ cách tính Trọng lượng khối (Block Weight - giới hạn ảo 4MB).

---

# CHƯƠNG 5: ĐỒNG THUẬN GIAO DỊCH (TRANSACTIONAL CONSENSUS)

## Slide 1: Sổ cái Chuỗi khối & Cây Merkle
*   **Liên kết mật mã:** Mỗi khối chứa mã băm tiêu đề của khối liền trước nó. Việc thay đổi bất kỳ ký tự nào trong khối cũ sẽ thay đổi mã băm của nó, làm gãy toàn bộ chuỗi liên kết và ngay lập tức bị mạng lưới từ chối.
*   **Cấu trúc Cây Merkle (Merkle Tree):**
    *   Gom toàn bộ các giao dịch trong khối lại và băm đôi một theo hình cây phân cấp để tìm ra một mã băm gốc duy nhất (**Merkle Root**).
    *   Cho phép các nút SPV dễ dàng xác minh một giao dịch cụ thể có nằm trong khối hay không với chi phí cực thấp bằng đường dẫn Merkle (Merkle Path) có độ phức tạp thuật toán chỉ là \(O(\log_2(N))\).

## Slide 2: Cơ chế Bằng chứng công việc (Proof of Work - PoW)
*   **Nguyên lý toán học:** Thợ đào phải liên tục thay đổi một số ngẫu nhiên (**Nonce**) trong tiêu đề khối sao cho mã băm SHA-256 kép của tiêu đề khối nhỏ hơn hoặc bằng một **giá trị ngưỡng** cho trước:
    \[\text{SHA-256}(\text{SHA-256}(\text{Block Header})) \le \text{Threshold}\]
*   **Tính bất đối xứng:** Việc tìm ra số Nonce hợp lệ cực kỳ khó khăn và tốn năng lượng (yêu cầu hàng nghìn tỷ phép thử mỗi giây), nhưng việc xác minh kết quả của các nút khác lại cực kỳ dễ dàng (chỉ mất đúng một phép tính băm duy nhất).
*   **Điều chỉnh độ khó (Difficulty Adjustment):** Tự động diễn ra sau mỗi **2,016 khối** (khoảng 2 tuần). Nếu thời gian đào khối trung bình nhanh hơn 10 phút, độ khó tăng lên (giá trị ngưỡng giảm) và ngược lại, đảm bảo nguồn cung phát hành ổn định.

## Slide 3: Cơ chế Phát hành tiền & Halving
*   **Giao dịch Coinbase:** Giao dịch đặc biệt đầu tiên trong mỗi khối, do thợ đào tự tạo ra để nhận phần thưởng khối và toàn bộ phí giao dịch từ các giao dịch khác. Đây là cơ chế phát hành Bitcoin mới duy nhất vào lưu thông.
*   **Cơ chế Halving (Giảm một nửa phần thưởng):**
    *   Diễn ra định kỳ sau mỗi **210,000 khối** (khoảng 4 năm).
    *   Phần thưởng khối giảm dần từ 50 BTC (2009) -> 25 BTC (2012) -> 12.5 BTC (2016) -> 6.25 BTC (2020) ... và sẽ chạm mốc 0 vào khoảng năm 2140.
    *   **Tương lai dài hạn:** Khi phần thưởng khối bằng không, thợ đào sẽ hoạt động hoàn toàn dựa trên nguồn thu từ phí giao dịch của người dùng.

## Slide 4: Kinh tế học Khai thác & Mỏ đào
*   **Cạnh tranh hoàn hảo:** Ngành đào Bitcoin hoạt động theo lý thuyết cạnh tranh hoàn hảo kinh điển. Thợ đào tăng công suất cho đến khi doanh thu biên bằng chi phí biên (\(MR = MC\)). Chi phí biến đổi lớn nhất là tiền điện và hiệu suất của thiết bị phần cứng.
*   **Sự trỗi dậy của Mỏ đào (Mining Pools):**
    *   Để giảm thiểu sự biến động doanh thu (thợ đào đơn lẻ có thể mất nhiều năm không đào được khối nào), các thợ đào kết hợp năng lực tính toán lại với nhau thành một mỏ đào lớn.
    *   Mỏ đào phân phối lại phần thưởng cho các thành viên dựa trên đóng góp năng lực băm (shares).
    *   *Rủi ro:* Gây ra sự tập trung lực lượng đào vào tay một vài quản trị viên mỏ đào lớn, đe dọa đến tính phi tập trung của mạng lưới.

## Slide 5: Các Vector tấn công Đồng thuận
*   **Tấn công 51% (Chi tiêu kép):** Thực thể kiểm soát trên 50% năng lực băm toàn mạng có khả năng bí mật đào một chuỗi khối riêng tư dài hơn chuỗi công khai, sau đó công bố để đảo ngược các giao dịch đã hoàn tất nhằm thực hiện chi tiêu kép.
*   **Tấn công Goldfinger (Phá hoại):** Kẻ tấn công không nhằm mục đích kiếm lợi tài chính mà muốn phá hủy hoàn toàn niềm tin vào Bitcoin bằng cách liên tục làm gián đoạn mạng lưới (thường do các quốc gia đối địch thực hiện).
*   **Tấn công chi tiêu kép giao dịch chưa xác nhận (0-confirmation):** Kẻ lừa đảo gửi một giao dịch mua hàng với phí cực thấp cho nạn nhân, đồng thời gửi một giao dịch chi tiêu kép tự chuyển về ví mình với phí cực cao để thợ đào ưu tiên xác nhận trước, đánh lừa các điểm bán hàng chấp nhận thanh toán tức thời mà không chờ khối xác nhận.

---

# CHƯƠNG 6: CÁC THÁCH THỨC CỦA BITCOIN (BITCOIN'S CHALLENGES)

## Slide 1: Thách thức Biến động Giá & Stablecoins
*   **Nguyên nhân biến động:** Lộ trình cung tiền của Bitcoin là hoàn toàn cố định bằng thuật toán bất biến, không thể co giãn để thích nghi với các biến động mạnh của tổng cầu trên thị trường. Sức cầu tăng/giảm chỉ có thể phản ánh trực tiếp vào sự thay đổi cực đoan của giá cả.
*   **Sự ra đời của Stablecoins:** Thiết kế tài sản mã hóa duy trì giá trị ổn định (neo vào USD) để làm phương tiện thanh toán hiệu quả hơn.
*   **Ba mô hình Stablecoin chính:**
    1.  *Thế chấp ngoại chuỗi (Fiat-backed):* Bảo chứng bằng USD thực tế gửi trong ngân hàng (ví dụ: USDT, USDC). Rủi ro tập trung hóa và kiểm toán minh bạch.
    2.  *Thế chấp nội chuỗi (Crypto-backed):* Thế chấp quá mức bằng tài sản mã hóa khác trên chuỗi (ví dụ: DAI). Rủi ro bị thanh lý tài sản tự động khi thị trường sụp đổ mạnh.
    3.  *Thuật toán (Algorithmic / Unbacked):* Tự động điều chỉnh cung cầu qua thuật toán đúc/đốt token bổ trợ. Bản chất cực kỳ kém ổn định, dễ rơi vào vòng xoáy tử thần (death spiral) phá sản (ví dụ: mô hình Terra/Luna).

## Slide 2: Tiền kỹ thuật số Ngân hàng Trung ương (CBDC)
*   **Động lực chính phủ:** Giành lại quyền kiểm soát chính sách tiền tệ trước sự trỗi dậy của các tài sản mã hóa tư nhân.
*   **Phân loại mô hình CBDC:**
    *   *Mô hình Token chạy trên chuỗi công khai (CBCC/Fedcoin):* Ngân hàng trung ương phát hành trực tiếp token lên blockchain để người dân tự quản lý. Mô hình này ít khả thi vì chính phủ mất khả năng kiểm soát danh tính và phòng chống rửa tiền (KYC/AML).
    *   *Mô hình Sổ cái tập trung:* Người dân mở tài khoản trực tiếp tại Ngân hàng Trung ương hoặc thông qua các ngân hàng thương mại làm trung gian phân phối dữ liệu. Đây là mô hình được lựa chọn phổ biến, tăng cường khả năng giám sát tài chính tối đa của nhà nước nhưng triệt tiêu hoàn toàn quyền riêng tư của người dân.

## Slide 3: Thách thức mở rộng quy mô & Mạng Lightning
*   **Giới hạn vật lý:** Bitcoin chỉ xử lý được khoảng **3-7 giao dịch mỗi giây (TPS)** do giới hạn dung lượng khối 1MB và thời gian tạo khối 10 phút. So sánh với Visa xử lý hàng chục ngàn TPS.
*   **Mạng lưới Lightning (Lightning Network - Layer 2):**
    *   Giải pháp mở rộng quy mô ngoại chuỗi (off-chain) bằng cách thiết lập các **Kênh thanh toán song phương** giữa các người dùng.
    *   *Cơ chế vận hành:* Người dùng khóa một lượng Bitcoin vào tài khoản multisig chung trên chuỗi khối chính (Layer 1). Sau đó, họ có thể thực hiện hàng triệu giao dịch ngoài chuỗi tức thời với chi phí gần như bằng không bằng cách cập nhật bảng cân đối nội bộ. Chỉ khi đóng kênh thanh toán, số dư cuối cùng mới được ghi nhận lại lên chuỗi khối chính.
    *   Sử dụng **Cam kết thu hồi bất đối xứng** để tự động tịch thu toàn bộ tiền của bên nào cố tình gian lận gửi trạng thái số dư cũ lên chuỗi chính.

## Slide 4: Thách thức về Tiêu thụ Năng lượng & Chính trị
*   **Kinh tế học năng lượng PoW:** Cơ chế Bằng chứng công việc đòi hỏi thợ đào liên tục chạy máy tính cấu hình cao. Do tính cạnh tranh hoàn hảo, lượng điện tiêu thụ của mạng lưới Bitcoin tỷ lệ thuận với giá trị thị trường của Bitcoin:
    \[\text{Tổng chi phí điện năng} \approx \text{Tổng doanh thu đào coin (Phần thưởng + Phí)}\]
    Điều này khiến Bitcoin tiêu thụ lượng điện khổng lồ ngang ngửa với nhiều quốc gia đang phát triển, dấy lên lo ngại lớn về môi trường.
*   **Rủi ro địa chính trị & Sự tập trung của cải:**
    *   *Cá voi Bitcoin (Whales):* Sự phân bổ Bitcoin có tính tập trung cao độ, nơi một nhóm nhỏ địa chỉ ví nắm giữ phần lớn lượng cung lưu thông, dễ dàng thao túng giá thị trường.
    *   *Sự can thiệp pháp lý:* Các quốc gia có thể cấm giao dịch, cấm đào hoặc áp thuế nặng để hạn chế tầm ảnh hưởng của Bitcoin đối với hệ thống tài chính truyền thống.

---

# CHƯƠNG 7: CÁC ỨNG DỤNG KHÁC (FURTHER APPLICATIONS)

## Slide 1: Xác minh phi tập trung và Chứng thực tài liệu
*   **Ứng dụng cốt lõi:** Chuỗi khối hoạt động như một máy đóng dấu thời gian bất biến toàn cầu, cho phép chứng thực tài liệu điện tử mà không cần bên thứ ba đáng tin cậy.
*   **Ba hình thức bằng chứng:**
    1.  **Bằng chứng tồn tại (Proof of Existence):** Băm một tài liệu (ví dụ: bằng sáng chế, hợp đồng) và lưu mã băm lên blockchain qua giao dịch chứa `OP_RETURN`. Giúp chứng minh tài liệu đã tồn tại ở một thời điểm cụ thể trong quá khứ mà không cần tiết lộ nội dung gốc của tài liệu.
    2.  **Bằng chứng toàn vẹn (Proof of Integrity):** Đảm bảo tài liệu không bị chỉnh sửa. Chỉ cần thay đổi một dấu phẩy, mã băm tạo ra sẽ hoàn toàn khác biệt so với mã băm đã lưu trên chuỗi khối.
    3.  **Bằng chứng xác thực (Proof of Authenticity):** Kết hợp chữ ký số mật mã của tổ chức phát hành để chứng minh nguồn gốc chính chủ của tài liệu.

## Slide 2: Token hóa tài sản & Colored Coins
*   **Khái niệm Colored Coins:** Công nghệ thời kỳ đầu của Bitcoin, cho phép "tô màu" (đánh dấu bằng siêu dữ liệu bổ sung) các phân số Bitcoin nhỏ (Satoshi) để chúng đại diện cho các tài sản thực tế ngoài đời thực như cổ phiếu, trái phiếu, vàng hoặc vé xem ca nhạc.
*   **Token trên nền tảng Hợp đồng thông minh:** Các tiêu chuẩn token hiện đại như ERC-20 (token khả hoán) hay ERC-721 (token không khả hoán - NFT) chạy trên mạng lưới Ethereum, cho phép tự động hóa quy trình quản lý và chuyển nhượng tài sản qua mã code.
*   **Rủi ro mất cân bằng hệ thống:** Việc chuyển tải các tài sản ngoài đời thực lên chuỗi khối làm tăng lưu lượng giao dịch và áp lực bảo mật lên mạng lưới, nhưng thợ đào bảo vệ mạng lưới lại không được chia sẻ lợi ích kinh tế trực tiếp từ giá trị các tài sản ngoại chuỗi đó.

## Slide 3: Khái niệm Hợp đồng thông minh (Smart Contracts)
*   **Định nghĩa:** Tập hợp các điều khoản hợp đồng được số hóa thành các đoạn mã lập trình tự động thực thi khi đáp ứng đầy đủ các điều kiện xác định trước mà không cần sự can thiệp của con người hay tòa án.
*   **So sánh kiến trúc Tài khoản Ethereum:**
    *   *Tài khoản sở hữu bên ngoài (EOA):* Kiểm soát trực tiếp bằng khóa riêng tư, không chứa mã code, chỉ có thể ký và gửi giao dịch.
    *   *Tài khoản hợp đồng (Contract Accounts - CA):* Vận hành hoàn toàn bằng mã code lập trình sẵn, tự kích hoạt hành động khi nhận được giao dịch từ EOA hoặc hợp đồng khác.
*   **Ứng dụng thực tế trên mô hình UTXO của Bitcoin:** Thiết kế các kịch bản hợp đồng phức tạp ngoại chuỗi trước khi gửi lên mạng lưới xác minh:
    *   *Thỏa thuận mua bán có điều kiện:* Giao dịch nguyên tử (atomic swap) đảm bảo tiền và hàng hóa chỉ được hoán đổi đồng thời, loại bỏ rủi ro một bên quỵt hợp đồng.
    *   *Khoản vay thế chấp:* Sử dụng tài khoản đa chữ ký 2-trên-2 kết hợp khóa thời gian khóa chết `nLockTime` để bảo vệ quyền lợi thu hồi nợ của chủ nợ và quyền nhận lại thế chấp của người vay.

## Slide 4: Hệ thống Oracle phi tập trung
*   **Vấn đề Oracle:** Blockchain là hệ thống đóng, hoàn toàn cô lập và không thể tự truy cập trực tiếp các dữ liệu thực tế ngoài đời thực (như kết quả bóng đá, giá vàng, nhiệt độ thời tiết). Hợp đồng thông minh cần có một **Oracle** để cung cấp các dữ liệu ngoại chuỗi này.
*   **Rủi ro tập trung hóa:** Nếu chỉ tin vào một nguồn Oracle duy nhất, hệ thống phi tập trung sẽ mất đi ý nghĩa bảo mật vì Oracle đó hoàn toàn có thể cung cấp dữ liệu giả mạo để thao túng hợp đồng.
*   **Giải pháp Đa chữ ký nhiều bên:** Thiết lập cấu hình đa chữ ký phức tạp (ví dụ: cấu hình m-trên-(2m-1)) yêu cầu dữ liệu phải được xác nhận đồng thuận từ đa số nguồn cung cấp dữ liệu độc lập khác nhau trước khi hợp đồng thông minh được phép thực thi.

---

# CHƯƠNG 8: HƯỚNG DẪN THỰC HÀNH BITCOIN (PRACTICAL GUIDELINES)

## Slide 1: Phương thức sở hữu Bitcoin an toàn
*   **Các kênh mua sắm phổ biến:**
    *   *Giao dịch trực tiếp (OTC):* Mua bán trực tiếp giữa các cá nhân, tính riêng tư cao nhưng rủi ro lừa đảo vật lý lớn.
    *   *Sàn giao dịch tập trung (CEX):* Tiện lợi, thanh khoản cao nhưng người dùng phải tuân thủ KYC nghiêm ngặt và đối mặt rủi ro sàn bị sập, bị hack hoặc đóng băng tài khoản.
    *   *ATM Bitcoin:* Thuận tiện mua bằng tiền mặt trực tiếp nhưng phí giao dịch cực kỳ đắt đỏ.
*   **Cảnh báo Đào đám mây (Cloud Mining):** Phần lớn các dự án bán gói đào coin từ xa đều là mô hình lừa đảo đa cấp Ponzi biến tướng. Việc đào Bitcoin thực tế hiện nay đòi hỏi hạ tầng ASIC chuyên dụng quy mô lớn, cá nhân tự đào bằng PC/Laptop không thể sinh lời.
*   **Quy tắc vàng:** **Tuyệt đối không bao giờ mua khóa riêng tư do người khác tạo sẵn** dưới bất kỳ hình thức nào.

## Slide 2: Chiến lược Lưu trữ & Bảo mật khóa riêng tư
*   **Triết lý cốt lõi:** *"Not your keys, not your coins"* (Không nắm khóa riêng tư, không phải tiền của bạn). Tránh để tiền dài hạn trên các sàn giao dịch tập trung.
*   **So sánh hai phương thức lưu trữ chính:**
    *   **Ví nóng (Hot Storage):** Lưu trữ trên thiết bị kết nối mạng (ứng dụng điện thoại, máy tính). Tiện lợi để giao dịch hàng ngày nhưng dễ bị tấn công bởi mã độc, virus hoặc hacker trực tuyến.
    *   **Ví lạnh (Cold Storage):** Cách ly hoàn toàn khỏi internet.
        *   *Ví phần cứng (Hardware Wallet - Trezor, Ledger):* Thiết bị chuyên dụng ký giao dịch ngoại tuyến, chống hack tuyệt đối ngay cả khi cắm vào máy tính nhiễm virus.
        *   *Ví giấy (Paper Wallet):* Tự in khóa và mã QR ra giấy. Cần đặc biệt lưu ý xóa bộ nhớ máy in sau khi in để tránh rò rỉ dữ liệu.
*   **Sao lưu nâng cao:** Sử dụng cơ chế chia nhỏ bí mật **Shamir's Secret Sharing** hoặc thiết lập đa chữ ký (Multisig) để chống rủi ro mất mát hoặc bị cưỡng đoạt tài sản.

## Slide 3: Chấp nhận Thanh toán trong Kinh doanh
*   **Quy trình chuẩn hóa hóa đơn (BIP0021):** Tạo mã QR tích hợp sẵn địa chỉ ví, số lượng Bitcoin yêu cầu thanh toán và nội dung tin nhắn hóa đơn để khách hàng quét nhanh bằng ứng dụng ví di động.
*   **Ứng dụng Khóa công khai mở rộng - xpub (BIP0044):**
    *   Giải pháp tối ưu cho các website thương mại điện tử.
    *   Máy chủ trực tuyến chỉ cần lưu giữ khóa **xpub** để tự động tạo ra một địa chỉ ví mới duy nhất cho mỗi đơn hàng của khách hàng mà không cần lưu trữ khóa riêng tư trực tuyến.
    *   Đảm bảo an toàn tuyệt đối cho doanh nghiệp: nếu máy chủ web bị hack, kẻ tấn công cũng không thể đánh cắp được tiền vì khóa riêng tư ngoại chuỗi vẫn an toàn trong ví lạnh của chủ doanh nghiệp.
*   **Sử dụng cổng trung gian quy đổi tức thời:** Giúp doanh nghiệp chấp nhận thanh toán Bitcoin nhưng nhận về nội tệ ngay lập tức, loại bỏ hoàn toàn rủi ro biến động tỷ giá và các thủ tục kế toán phức tạp.
