# BẢN DỊCH CHƯƠNG 6: CÁC THÁCH THỨC CỦA BITCOIN (Bitcoin's Challenges)

Bản dịch chi tiết dựa trên tài liệu nguồn chính thức từ cuốn sách *"Bitcoin, Blockchain, and Cryptoassets: A Comprehensive Introduction"* của hai tác giả Fabian Schär và Aleksander Berentsen.

---

## LỜI GIỚI THIỆU
Bài báo năm 2008 của Satoshi Nakamoto mang tên *"Bitcoin: A Peer-to-Peer Electronic Cash System"* là một trong những đóng góp có ảnh hưởng nhất đối với kinh tế học tiền tệ trong vòng năm mươi năm qua. Điều thú vị và đáng nói là bài báo này được công bố vào năm 2008 thông qua một danh sách gửi thư về mật mã học chứ không phải trên một tạp chí khoa học được bình duyệt. Công nghệ này kết hợp nhiều kỹ thuật khác nhau để tạo ra một tài sản ảo hoàn toàn khác biệt với bất kỳ tài sản nào khác. Lần đầu tiên trong lịch sử, việc sở hữu tài sản ảo là khả thi mà không cần đến một cơ quan trung ương—một sự đổi mới có tiềm năng thay đổi tận gốc hệ thống tài chính hiện tại và nhiều lĩnh vực khác.

Mặc dù công nghệ Bitcoin rất hấp dẫn, nhưng nó vẫn phải đối mặt với nhiều thách thức lớn. Đối với một số nhà quan sát, những thách thức này là không thể vượt qua. Ví dụ, Stephen Williamson lập luận rằng *"tương lai của Bitcoin có vẻ rất ảm đạm. Nó đại diện cho một hệ thống thanh toán kém hiệu quả, khả năng sao chép nó đồng nghĩa với việc nó không thể tồn tại như một công cụ lưu trữ giá trị an toàn như vàng, và thậm chí nó có thể cung cấp dịch vụ tồi tệ cho những kẻ tội phạm."* Ông kết luận rằng *"nhiều khả năng, giá trị của Bitcoin sẽ tiến về số không."*

Chúng tôi lạc quan hơn về tương lai của Bitcoin. Dù vậy, chúng tôi không muốn phủ nhận thực tế rằng Bitcoin đang phải đối mặt với một số thách thức nghiêm trọng. Trong chương này, chúng ta sẽ xem xét kỹ hơn một số thách thức này và thảo luận về các giải pháp tiềm năng. Các vấn đề bao gồm biến động giá cả cao, khả năng mở rộng quy mô, tiêu thụ năng lượng lớn, sự không chắc chắn về mặt pháp lý và mức độ chấp nhận thực tế còn thấp.

---

## 6.1 BIẾN ĐỘNG GIÁ CẢ (Price Volatility)
Trước hết, chúng ta sẽ xem xét lộ trình cung tiền được xác định trước của Bitcoin và các lập luận cho rằng Bitcoin là một đồng tiền giảm phát. Phần này sẽ giúp chúng ta hiểu được nguồn gốc của sự biến động giá cả của Bitcoin.

### 6.1.1 Lộ trình cung tiền của Bitcoin (Bitcoin's Supply Path)
Nguồn cung của Bitcoin được xác định trước và hội tụ về mức 21 triệu đơn vị, sau đó không có đơn vị Bitcoin mới nào được tạo ra thêm nữa. Lộ trình cung tiền của Bitcoin được hiển thị trong Hình 6.1. Đường cong nét liền màu xám biểu diễn lộ trình thực tế, trong khi đường nét đứt biểu diễn lộ trình lý thuyết. Sự khác biệt phát sinh do giá trị ngưỡng độ khó (difficulty threshold value) chỉ được điều chỉnh sau mỗi 2.016 khối. Các điểm thay đổi độ dốc trên lộ trình lý thuyết tương ứng với thời điểm phần thưởng khối bị chia đôi (halving).

Hình 6.2 so sánh tốc độ tăng trưởng của Bitcoin với tốc độ tăng trưởng của cơ sở tiền tệ đô la Mỹ (USD). Biểu đồ làm nổi bật tốc độ tăng trưởng ban đầu rất cao của Bitcoin. Sự sụt giảm của tốc độ tăng trưởng này có hai nguyên nhân:
1. Phần thưởng khối không đổi tạm thời đáp ứng một cơ sở tiền tệ ngày càng tăng, dẫn đến tốc độ tăng trưởng thấp hơn theo thời gian.
2. Việc chia đôi định kỳ phần thưởng khối làm giảm thêm tốc độ tăng trưởng. Một ví dụ về sự sụt giảm đột ngột như vậy có thể được quan sát vào cuối năm 2012.

Sự biến động cao trong tốc độ tăng trưởng cơ sở tiền tệ của đô la Mỹ là rất đáng kinh ngạc. Ngược lại, nguồn cung tiền của Bitcoin có tốc độ tăng trưởng tương đối mượt mà ở nửa sau của biểu đồ. Tuy nhiên, biến động giá của Bitcoin lại lớn hơn đáng kể so với biến động giá của đô la Mỹ (xem phần 6.1.3).

### 6.1.2 Bitcoin có mang tính giảm phát không? (Is Bitcoin Deflationary?)
Một đồng tiền có nguồn cung cố định thường được coi là có tính chất giảm phát. Nếu nhu cầu đối với đồng tiền đó tăng lên trong khi nguồn cung không đổi, giá trị của nó sẽ tăng lên, dẫn đến việc giảm giá hàng hóa và dịch vụ được tính bằng đồng tiền đó. 

Một khía cạnh quan trọng từ lý thuyết tiền tệ hiện đại là các đồng tiền không có giá trị nội tại (intrinsic value) sẽ có nhiều mức giá cân bằng (equilibrium prices). Một trong số đó luôn là mức bằng không. Nếu tất cả những người tham gia thị trường kỳ vọng rằng Bitcoin sẽ không có giá trị trong tương lai, thì không ai sẵn lòng trả tiền để mua nó hôm nay, và giá thị trường kết quả sẽ bằng không. Một mức giá dương cũng có thể là một mức giá cân bằng. Ví dụ, nếu các tác nhân tin rằng Bitcoin sẽ có giá 1 triệu USD vào ngày mai, họ sẽ sẵn lòng trả 1 triệu USD hôm nay (giả định không có chiết khấu), và do đó giá cân bằng hôm nay sẽ là 1 triệu USD. Vì giá của một tài sản không có giá trị nội tại được quyết định hoàn toàn bởi kỳ vọng của thị trường về giá tương lai của nó, nên bất kỳ sự thay đổi nào trong kỳ vọng này cũng sẽ lập tức chuyển hóa thành sự biến động giá cực lớn trên thị trường hôm nay.

#### Hộp 6.1: Bitcoin có phải là Vàng kỹ thuật số? (Is Bitcoin Digital Gold?)
Một trường hợp sử dụng tiềm năng của Bitcoin là hoạt động như một tài sản trú ẩn an toàn (safe-haven asset). Trong bối cảnh này, Bitcoin thường được so sánh với vàng và được gọi là "vàng kỹ thuật số". 

Nhiều người lập luận rằng bất kỳ ai cũng có thể sao chép phần mềm mã nguồn mở của Bitcoin để tạo ra một đồng tiền mới có thuộc tính tương tự, do đó Bitcoin không thể giữ được tính khan hiếm lâu dài. Tuy nhiên, lập luận này đã bỏ qua khái niệm về hiệu ứng mạng lưới (network effects). Việc sao chép mã nguồn của một tác phẩm nghệ thuật nổi tiếng không làm giảm giá trị của bức tranh gốc vì bản sao dễ dàng bị phân biệt với bản gốc. Điều tương tự cũng đúng với Bitcoin. Việc sao chép phần mềm Bitcoin và khởi chạy một chuỗi khối mới với một tài sản mã hóa hoàn toàn mới là điều dễ dàng, nhưng tài sản mới này có thể dễ dàng bị phân biệt với Bitcoin gốc. Trên thực tế, việc nhận diện các bản sao của Bitcoin thậm chí còn dễ dàng hơn nhiều so với thị trường nghệ thuật, nơi đôi khi ngay cả các chuyên gia cũng bị lừa gạt bởi các bản sao tinh vi. Ngược lại, các bản sao của Bitcoin (altcoins/clones) không những không làm loãng nguồn cung của Bitcoin gốc mà đôi khi còn giúp tăng cường mức độ nhận diện và hiệu ứng mạng lưới của Bitcoin.

### 6.1.3 Phân tích biến động (Volatility Analysis)
Để một tài sản có thể hữu ích như một phương tiện trao đổi (medium of exchange) hoặc đơn vị hạch toán (unit of account), nó cần phải có biến động giá thấp. Biến động giá thấp, đến lượt nó, yêu cầu nguồn cung của nó phải có tính co giãn (elastic supply). Các ngân hàng trung ương ở các nước phát triển ổn định giá trị đồng tiền của họ bằng cách điều chỉnh nguồn cung một cách co giãn để đáp ứng các thay đổi trong tổng cầu. Trên thực tế, Hệ thống Dự trữ Liên bang Mỹ (Fed) được thành lập rõ ràng nhằm "cung cấp một đồng tiền có tính co giãn" để giảm thiểu các biến động giá phát sinh từ sự thay đổi trong tổng cầu đối với đồng đô la Mỹ.

Điều khác biệt giữa Bitcoin và các đồng tiền pháp định của chính phủ này là sự vắng mặt của cơ chế ổn định giá cả trong giao thức Bitcoin. Tổng cầu đối với Bitcoin được thúc đẩy bởi kỳ vọng giá cả, và những kỳ vọng này phản ứng theo những cách không thể dự đoán trước đối với tin tức, tâm lý và tin đồn. Những kỳ vọng biến động mạnh mẽ này ảnh hưởng đến tổng cầu, và do lộ trình cung tiền của Bitcoin là cố định, biến động giá của Bitcoin là rất cao.

**Bảng 6.1** tổng hợp sự biến động giá của Bitcoin, cho thấy giá cao nhất, thấp nhất trong các năm từ 2009–2019 cũng như biến động hàng năm của tỷ suất lợi nhuận hàng ngày ($\sigma_{ann}$):

| Năm | Thấp nhất (USD) | Cao nhất (USD) | Biến động hàng năm ($\sigma_{ann}$) |
|---|---|---|---|
| 2009 | 0.00 | 0.00 | 0.00 |
| 2010 | 0.00 | 0.50 | $\infty$ |
| 2011 | 0.30 | 35.00 | 1.96 |
| 2012 | 4.33 | 15.40 | 0.63 |
| 2013 | 13.40 | 1,151.00 | 1.43 |
| 2014 | 310.74 | 953.29 | 0.75 |
| 2015 | 178.10 | 465.32 | 0.69 |
| 2016 | 364.33 | 998.33 | 0.48 |
| 2017 | 777.76 | 19,497.40 | 0.95 |
| 2018 | 3,236.76 | 17,527.00 | 0.81 |
| 2019 | 3,399.47 | 13,016.23 | 0.68 |

Các số liệu cho thấy mức độ biến động giá là rất lớn nhưng có xu hướng giảm dần theo thời gian. Hình 6.3 hiển thị mức biến động giá hàng năm được tính toán liên tục dựa trên độ lệch chuẩn của 365 ngày gần nhất, xác nhận xu hướng giảm này nhưng mức độ biến động vẫn cao hơn đáng kể so với biến động sức mua của đồng đô la Mỹ. Do thiếu cơ chế ổn định giá trong giao thức, rất có thể đơn vị Bitcoin sẽ mãi mãi duy trì mức dao động giá ngắn hạn cao hơn nhiều so với các đồng tiền pháp định do chính phủ vận hành. Do đó, việc các đề xuất tạo ra tiền mã hóa ổn định giá (stablecoin) xuất hiện là điều dễ hiểu.

### 6.1.4 Stablecoin: Hành trình tìm kiếm tiền mã hóa biến động thấp (Stablecoins: The Quest for a Low-Volatility Cryptocurrency)
Stablecoin là một tài sản mã hóa được phát triển với mục tiêu giảm thiểu biến động giá bằng cách tích hợp một cơ chế ổn định. 

Các stablecoin đầu tiên xuất hiện vào năm 2014 (ví dụ: BitShares, NuBits, Tether). Báo cáo *"The State of Stablecoins"* đã xác định và mô tả tổng cộng 57 dự án stablecoin đang hoạt động và chuẩn bị ra mắt. Vốn hóa thị trường của tất cả các stablecoin vào đầu năm 2019 là khoảng 2,7 tỷ USD (chiếm khoảng 2% tổng vốn hóa thị trường của tất cả các tài sản mã hóa). Đồng tiền lớn nhất là Tether với vốn hóa thị trường khoảng 2 tỷ USD.

Có ba loại stablecoin chính, khác nhau chủ yếu ở cơ chế ổn định và hình thức tài sản thế chấp. Cơ chế ổn định có thể là thuật toán hoặc sử dụng tài sản thế chấp. Tài sản thế chấp có thể nằm trên chuỗi (on-chain) hoặc ngoại chuỗi (off-chain), như được trình bày trong **Bảng 6.2**:

| Mục tiêu neo giá | Cơ chế ổn định | Loại tài sản thế chấp | Ví dụ |
|---|---|---|---|
| Ngang giá USD | Thuật toán | Không có | Basis |
| Ngang giá USD | Thế chấp | Trên chuỗi (ví dụ: Ether) | DAI |
| Ngang giá USD | Thế chấp | Ngoại chuỗi (ví dụ: USD ký quỹ) | Tether (USDT), USDC |

Tất cả các stablecoin đều phá vỡ đề xuất giá trị cốt lõi của Bitcoin bằng cách thêm vào một mức độ tập trung nhất định. Nguyên nhân là vì sự ổn định yêu cầu nguồn cung của stablecoin phải điều chỉnh theo những thay đổi của nhu cầu, điều này không thể thực hiện được nếu không đưa vào một mức độ tập trung nhất định. Trong một số hệ thống, điều này "chỉ" yêu cầu các nguồn cấp dữ liệu giá; nghĩa là các *oracles* thông báo cho hợp đồng thông minh về giá thị trường của tài sản thế chấp và stablecoin. Trong các hệ thống khác, có một nhà phát hành trung tâm tự ý thao túng nguồn cung của stablecoin.

#### Stablecoin thuật toán (Algorithmic Stablecoins)
Đặc điểm định nghĩa của một stablecoin thuật toán thuần túy là sự vắng mặt của tài sản thế chấp. Thay vào đó, nhà thiết kế phát hành hai (hoặc đôi khi ba) loại tài sản: một tài sản là stablecoin (được neo giá vào USD), và tài sản thứ hai là một loại trái phiếu có thể được quy đổi thành stablecoin vào một ngày trong tương lai (chúng tôi gọi là "trái phiếu stablecoin" hay stablecoin bond).

Cơ chế ổn định cơ bản hoạt động như sau:
* Nếu nhu cầu tăng, giá stablecoin vượt quá 1 USD. Để đưa giá về mức neo, nhà phát hành tạo thêm stablecoin mới. Số coin mới này sẽ được phân phối miễn phí (airdrop) cho chủ sở hữu trái phiếu hoặc dùng để mua lại các trái phiếu đang lưu hành, từ đó tăng cung và giảm giá stablecoin.
* Nếu nhu cầu giảm, giá stablecoin giảm dưới 1 USD. Nhà phát hành sẽ tạo ra các trái phiếu stablecoin mới và bán chúng lấy stablecoin nhằm rút bớt lượng stablecoin khỏi lưu thông. Trái phiếu stablecoin thực chất là một lời hứa sẽ trả stablecoin trong tương lai; nghĩa là, stablecoin thuật toán cố gắng ổn định mức giá đang giảm bằng cách hứa hẹn sẽ tăng nguồn cung stablecoin trong tương lai. Để khuyến khích mọi người mua, trái phiếu được bán với mức chiết khấu do thị trường quyết định.

Tuy nhiên, cơ chế này có một lỗ hổng nghiêm trọng về kinh tế học. Khi xảy ra một cú sốc giảm cầu mạnh (ví dụ do tin giả), giá stablecoin giảm sâu. Người mua trái phiếu sẽ lo sợ hệ thống sụp đổ và yêu cầu mức chiết khấu cực cao—ví dụ 50%. Tức là họ chỉ trả 0.5 USD hôm nay để nhận lời hứa trả 1 USD stablecoin trong tương lai. Điều này đồng nghĩa với việc cứ mỗi stablecoin bị rút khỏi lưu thông hôm nay, hệ thống lại tự tạo ra nghĩa vụ phải in thêm 2 stablecoin trong tương lai. Các nhà đầu tư nhìn thấy trước sự lạm phát này sẽ càng lo sợ và đòi mức chiết khấu cao hơn nữa, dẫn đến việc sụp đổ hoàn toàn cơ chế neo giá (vòng xoáy tử thần). Do đó, chúng tôi khuyến nghị người dùng nên hết sức hoài nghi về các dự án stablecoin thuật toán; trong số các cơ chế, stablecoin thuật toán có nền tảng lý thuyết yếu kém nhất.

#### Stablecoin thế chấp trên chuỗi (Collateralized Stablecoins: On-Chain)
Cơ chế hoạt động của stablecoin thế chấp trên chuỗi được thể hiện rõ nhất qua đồng DAI, được neo giá vào USD. DAI là một token tiêu chuẩn ERC-20 hoạt động dựa trên một tập hợp các hợp đồng thông minh trên chuỗi khối Ethereum. Bất kỳ ai cũng có thể tạo ra token DAI mới bằng cách gửi Ether (ETH)—tài sản bản địa của Ethereum—vào một hợp đồng thông minh để làm tài sản thế chấp cho một khoản vay bằng DAI. Lãi suất của khoản vay này được gọi là phí ổn định (stability fee) và vị thế vay được gọi là Vị thế nợ thế chấp (Collateralized Debt Position - CDP).

Vì Ether là một tài sản có biến động giá mạnh, khoản vay DAI phải luôn ở trạng thái thế chấp vượt mức (over-collateralized). Tỷ lệ thế chấp tối thiểu hiện tại là 150%. Nghĩa là, nếu một người dùng khóa lượng Ether trị giá 150 USD vào hợp đồng thông minh, họ chỉ có thể vay tối đa 100 DAI. Người dùng được khuyến nghị nên duy trì tỷ lệ thế chấp cao hơn nhiều so với mức 150%, bởi vì nếu giá trị tài sản thế chấp giảm xuống dưới mức này, CDP của họ sẽ bị tự động thanh lý—nghĩa là Ether thế chấp sẽ bị tự động bán trên thị trường để thu hồi DAI và hoàn trả khoản nợ.

#### Hộp 6.3 & 6.4: Cơ chế ổn định và Kinh doanh chênh lệch giá của DAI
Sự tương tác giữa các tác nhân có khẩu vị rủi ro khác nhau cấu thành nên cung và cầu của DAI:
* **Nguồn cung DAI (Người đi vay):** Những người muốn gia tăng rủi ro (sử dụng đòn bẩy) sẽ khóa Ether, vay DAI, sau đó bán DAI để mua thêm Ether.
* **Nhu cầu DAI (Người nắm giữ):** Những người muốn giảm thiểu rủi ro trong danh mục đầu tư sẽ bán các tài sản biến động giá mạnh để lấy DAI phòng vệ.

Khi giá DAI lệch khỏi mức 1 USD, cơ chế chênh lệch giá (arbitrage) sẽ tự động kích hoạt để điều chỉnh:
* **Nếu giá DAI > 1 USD (Ví dụ giá là 2 USD):** Cơ hội kiếm lời xuất hiện. Các nhà đầu cơ sẽ mở CDP, khóa Ether để tạo ra 1.000 DAI mới, sau đó bán 1.000 DAI này trên thị trường thu về 2.000 USD. Hành động này làm tăng nguồn cung DAI trên thị trường. Khi có nhiều người thực hiện, nguồn cung tăng sẽ đẩy giá DAI giảm trở lại mức 1 USD. Lúc này, họ chỉ cần bỏ ra 1.000 USD để mua lại 1.000 DAI và hoàn trả khoản vay, thu hồi Ether thế chấp và đút túi khoản lãi chênh lệch.
* **Nếu giá DAI < 1 USD (Ví dụ giá là 0.5 USD):** Những người đang có khoản nợ bằng DAI sẽ tranh thủ cơ hội này để trả nợ giá rẻ. Họ mua 1.000 DAI trên thị trường chỉ với chi phí 500 USD, sau đó dùng số DAI này để tất toán khoản nợ 1.000 DAI của mình trong hợp đồng thông minh. Việc này lập tức thu hồi và tiêu hủy 1.000 DAI khỏi lưu thông, đồng thời giải phóng tài sản thế chấp Ether. Hành động mua DAI số lượng lớn để trả nợ sẽ đẩy giá DAI tăng trở lại mức 1 USD.

Bên cạnh đó, tổ chức quản trị MakerDAO sử dụng công cụ chính sách tiền tệ cốt lõi là phí ổn định (stability fee). Việc tăng phí ổn định (tăng lãi suất) làm giảm động lực mở CDP mới và khuyến khích người dùng đóng các CDP hiện tại để trả nợ, từ đó giảm nguồn cung DAI và ngược lại.

Mặc dù DAI hoạt động tương đối hiệu quả, hệ thống vẫn đối mặt với các rủi ro: rủi ro lỗi mã nguồn trong hợp đồng thông minh; rủi ro từ các nguồn cấp dữ liệu giá (price feeds/oracles) vốn mang tính tập trung và là mục tiêu tấn công; và rủi ro khi giá Ether sụt giảm quá nhanh (ví dụ giảm hơn 50% trong thời gian cực ngắn) khiến hệ thống không kịp thanh lý tài sản thế chấp.

#### Stablecoin thế chấp ngoại chuỗi (Collateralized Stablecoins: Off-Chain)
Các stablecoin này sử dụng các tài khoản ngân hàng truyền thống hoặc các hình thức lưu ký tập trung khác để nắm giữ tài sản đảm bảo. Stablecoin nổi tiếng nhất trong nhóm này là Tether (USDT), được thành lập năm 2014 và có liên kết chặt chẽ với sàn giao dịch Bitfinex. Lịch sử của Tether phơi bày ba vấn đề cốt lõi của mô hình thế chấp ngoại chuỗi:
1. **Thiếu minh bạch:** Từ khi thành lập, luôn có sự hoài nghi lớn về việc liệu Tether có thực sự nắm giữ đủ số lượng USD ký quỹ tương ứng với lượng USDT phát hành hay không. Các cuộc kiểm toán đầy đủ thường rất tốn kém và khó thực hiện một cách độc lập.
2. **Không có khả năng chống kiểm duyệt:** Tài sản đảm bảo được gửi tại các định chế tài chính truyền thống, do đó có thể dễ dàng bị các cơ quan pháp lý đóng băng hoặc tịch thu bất kỳ lúc nào.
3. **Mâu thuẫn về mặt lợi nhuận và rủi ro dự trữ một phần:** Việc duy trì tài sản đảm bảo bằng tiền mặt lỏng (không sinh lãi hoặc lãi suất cực thấp) làm giảm khả năng sinh lời của nhà phát hành. Do đó, các nhà phát hành luôn bị cám dỗ bởi việc sử dụng một phần tài sản ký quỹ để đầu tư vào các tài sản sinh lời khác nhưng kém thanh khoản hơn, tiến dần đến mô hình ngân hàng dự trữ một phần (fractional reserve banking) đầy rủi ro.

### 6.1.5 Tiền kỹ thuật số của Ngân hàng Trung ương (Central Bank Digital Currency - CBDC)
Trước sự trỗi dậy của tài sản mã hóa, nhiều ngân hàng trung ương đã nghiên cứu phát hành CBDC. Có hai đề xuất cơ bản khác nhau: "Tiền mã hóa của ngân hàng trung ương" (Central Bank Cryptocurrency - CBCC, hay Fedcoin) và "Tiền điện tử của ngân hàng trung ương cho tất cả mọi người" (Central Bank Electronic Money for All). Sự khác biệt được minh họa trong ma trận cấu trúc kiểm soát ở **Hình 6.4**.

*   **Tiền mã hóa của ngân hàng trung ương (CBCC):** Đề xuất này hướng tới việc tạo ra một đồng tiền kỹ thuật số chạy trên mạng lưới phân tán (như Ethereum thông qua chuẩn ERC-20), cho phép giao dịch ẩn danh và không cần cấp phép (permissionless). Tuy nhiên, đây là một "lằn ranh đỏ" đối với các ngân hàng trung ương. Rủi ro danh tiếng là quá lớn nếu đồng CBCC này bị các băng đảng ma túy sử dụng để rửa tiền hoặc các tổ chức khủng bố sử dụng để mua vũ khí. Hơn nữa, nó sẽ vô hiệu hóa hoàn toàn các nỗ lực quản lý KYC/AML hiện tại và gây ra các cuộc xung đột chính trị giữa các quốc gia khi người dân nước này sử dụng trái phép đồng CBCC của nước khác (ví dụ người dân Trung Quốc sử dụng Fedcoin để lách luật kiểm soát vốn). Do đó, các ngân hàng trung ương sẽ không bao giờ phát hành một đồng tiền mã hóa phi tập trung, không cần cấp phép.
*   **Tiền điện tử của ngân hàng trung ương cho tất cả mọi người:** Đây là mô hình tập trung hoàn toàn, không cần sử dụng công nghệ chuỗi khối. NHTW sẽ cho phép các hộ gia đình và doanh nghiệp mở tài khoản thanh toán trực tiếp tại NHTW. Mô hình này mang lại nhiều lợi ích to lớn:
    1. Người dân được tiếp cận với một loại tiền kỹ thuật số an toàn tuyệt đối, hoàn toàn không có rủi ro đối tác (counterparty risk) vì NHTW không bao giờ có thể bị mất khả năng thanh toán đối với đồng nội tệ do họ tự in ra.
    2. Đơn giản hóa chính sách tiền tệ bằng cách sử dụng lãi suất trả trên các tài khoản này làm công cụ chính sách cốt lõi. Lãi suất này sẽ đóng vai trò là mức sàn lãi suất trong nền kinh tế.
    3. Tránh được các tranh cãi chính trị khi NHTW phải tung tiền cứu trợ các ngân hàng thương mại lớn ("quá lớn để sụp đổ") trong khủng hoảng, bằng cách cho phép người dân tiếp cận trực tiếp với dòng tiền lãi từ NHTW.
    4. Dễ dàng triển khai bằng cách bắt buộc các ngân hàng thương mại quản lý các tài khoản này dưới danh nghĩa của NHTW và hạch toán ngoại bảng để bảo vệ tài sản của người dân khi ngân hàng thương mại phá sản.

**Nhược điểm (Hộp 6.9):** Rủi ro lớn nhất là thúc đẩy các cuộc rút tiền hàng loạt (bank runs) từ ngân hàng thương mại sang tài khoản NHTW khi có tin đồn khủng hoảng tài chính xảy ra. Để giải quyết, NHTW có thể áp đặt một hạn mức (cap) tối đa cho số dư tài khoản của mỗi cá nhân trong giai đoạn đầu, đồng thời thiết lập cơ chế cung cấp thanh khoản khẩn cấp nhanh chóng cho các ngân hàng thương mại.

---

## 6.2 KHẢ NĂNG MỞ RỘNG QUY MÔ (Scalability)
Mạng lưới Bitcoin hiện tại chỉ có thể xử lý dưới mười giao dịch mỗi giây (trong thực tế, con số này thường dao động quanh mức bốn giao dịch mỗi giây tùy thuộc vào kích thước của các script giao dịch). Nút thắt cổ chai này dẫn đến tình trạng phí giao dịch tăng vọt và mempool bị quá tải trong các thời điểm hoạt động cao điểm, khơi mào cho các cuộc tranh luận gay gắt kéo dài nhiều năm về cách mở rộng quy mô cho Bitcoin.

### 6.2.1 Vấn đề tắc nghẽn (The Congestion Problem)
Kể từ khi ra đời năm 2009, số lượng giao dịch hàng ngày của Bitcoin không ngừng tăng trưởng và đạt đỉnh vào cuối năm 2017 trước khi sụt giảm 50% vào đầu năm 2018 (Hình 6.5). Hiện nay, mạng lưới xử lý khoảng 200.000 giao dịch mỗi ngày.

Vào tháng 7 năm 2010, kích thước của một khối trong chuỗi khối Bitcoin đã bị giới hạn ở mức tối đa là 1 MB. Với kích thước trung bình của một giao dịch dao động từ 400 đến 600 bytes trong những năm gần đây, một khối chỉ có thể chứa tối đa từ 1.600 đến 2.500 giao dịch. Với chu kỳ tạo khối trung bình là mười phút, công suất tối đa của Bitcoin chỉ đạt khoảng 3 đến 4 giao dịch mỗi giây.

Để so sánh, các mạng lưới thanh toán tập trung đạt công suất lớn hơn thế hàng ngàn lần:
* **PayPal:** Xử lý 7,6 tỷ giao dịch trong năm 2016, tương đương trung bình 240 giao dịch mỗi giây.
* **Visa:** Xử lý 111,2 tỷ giao dịch trong năm 2017, tương đương trung bình 3.500 giao dịch mỗi giây. Theo báo cáo của Visa, công suất tối đa mà mạng lưới của họ có thể đạt được là 65.000 giao dịch mỗi giây.

Sự hạn chế về công suất của Bitcoin dẫn đến tình trạng tắc nghẽn nghiêm trọng khi nhu cầu giao dịch tăng cao, thể hiện qua hai hệ quả: phí giao dịch tăng vọt do người dùng phải cạnh tranh để được thợ đào ưu tiên xác nhận trước, và kích thước mempool (hồ chứa các giao dịch chưa được xác nhận) phình to nhanh chóng (Hình 6.6).

### 6.2.2 Tăng giới hạn kích thước khối (Block Size Limit Increase)
Tăng kích thước khối là giải pháp dễ triển khai nhất về mặt lập trình, giúp tăng lập tức số lượng giao dịch xử lý được mỗi giây. Tuy nhiên, sự thay đổi này không thể được thực hiện một cách tùy tiện vì nó đòi hỏi một nâng cấp không tương thích ngược (hard fork hoặc forced fork). Nếu một nhóm người dùng không đồng thuận cập nhật phần mềm, mạng lưới sẽ bị chia tách vĩnh viễn.

Hơn nữa, việc tăng kích thước khối sẽ gây tổn hại nghiêm trọng đến tính phi tập trung của Bitcoin:
1. Nếu kích thước khối tăng lên mức lớn (ví dụ 128 MB), dung lượng chuỗi khối sẽ phình to cực nhanh. Chi phí phần cứng và băng thông internet để vận hành một nút đầy đủ (full node) sẽ tăng vượt quá khả năng tài chính của người dùng phổ thông, dẫn đến sự sụt giảm nghiêm trọng số lượng nút đầy đủ và làm tăng tính tập trung hóa của mạng lưới.
2. Khối lớn hơn sẽ tốn nhiều thời gian hơn để lan truyền qua mạng lưới P2P, làm tăng tỷ lệ xảy ra các cuộc đua khối (block races) và tỷ lệ khối mồ côi (orphan blocks), gây bất ổn cho hệ thống đồng thuận.
3. Khối lớn thúc đẩy sự tập trung hóa trong hoạt động khai thác, vì các mỏ đào lớn có hạ tầng mạng tốt hơn sẽ có lợi thế vượt trội trong việc lan truyền khối so với các thợ đào nhỏ lẻ.

Do đó, tăng kích thước khối không thể được xem là giải pháp cốt lõi để mở rộng quy mô cho Bitcoin, mà cùng lắm chỉ là một biện pháp bổ trợ tạm thời.

#### Hộp 6.11: Cuộc tranh luận về việc mở rộng quy mô (The Scaling Debate)
Sự bất đồng sâu sắc về giải pháp mở rộng quy mô đã dẫn đến việc mạng lưới Bitcoin bị phân tách vào tháng 8 năm 2017:
* Phân bang lớn đi theo nhóm **Bitcoin Core**, lựa chọn giải pháp tối ưu hóa thông qua Segregated Witness (SegWit) để chuẩn bị cho các giải pháp lớp thứ hai (layer 2).
* Nhóm thiểu số lựa chọn tách chuỗi để tạo ra một chuỗi khối mới mang tên **Bitcoin Cash (B-Cash)**, nâng kích thước khối lên 8 MB (sau đó tiếp tục nâng lên 32 MB) và từ chối kích hoạt SegWit. Cho đến nay, giá trị thị trường, quy mô cộng đồng và số lượng nhà phát triển của Bitcoin gốc vẫn vượt trội hoàn toàn so với B-Cash và các biến thể phân tách tiếp theo của nó (như Bitcoin SV).

### 6.2.3 Kênh thanh toán và Mạng lưới Lightning (Payment Channels and the Lightning Network)
Kênh thanh toán cho phép thực hiện các giao dịch ngoại chuỗi (off-chain) mà không cần phát sóng chúng lên chuỗi khối Bitcoin. Các giao dịch này chỉ được chia sẻ trực tiếp giữa hai bên tham gia và chỉ được ghi nhận lên chuỗi khối dưới dạng tổng hợp khi đóng kênh. Nhờ đó, người dùng có thể thực hiện hàng triệu giao dịch với tốc độ tức thì và chi phí gần như bằng không mà không làm quá tải chuỗi khối gốc.

#### Kênh thanh toán đơn hướng (Unidirectional Payment Channels)
Đây là dạng kênh đơn giản nhất, nơi dòng tiền chỉ chảy theo một hướng (ví dụ Tamara thanh toán cho Brian). Quy trình hoạt động như sau:
1. Hai bên mở một địa chỉ đa chữ ký 2-of-2 (Multisig). Tamara tạo một **giao dịch tài trợ (funding transaction)** gửi tiền vào địa chỉ này để xác định dung lượng kênh (channel capacity).
2. Trước khi phát sóng giao dịch tài trợ, để phòng ngừa rủi ro Brian biến mất và khóa chặt số tiền của mình, Tamara yêu cầu Brian ký trước một **giao dịch hoàn tiền (refund transaction)** có thiết lập khóa thời gian khóa `nLockTime = T` (ví dụ sau 1.008 khối). Nếu có sự cố, Tamara có thể lấy lại tiền sau thời điểm `T`. Sau khi nhận được chữ ký của Brian cho giao dịch hoàn tiền, Tamara mới ký và phát sóng giao dịch tài trợ lên chuỗi khối để chính thức mở kênh.
3. Khi thực hiện thanh toán off-chain (ví dụ 0.01 BTC), Tamara tạo ra một **giao dịch cam kết (commitment transaction)** sử dụng đầu vào là địa chỉ multisig của kênh, chia số dư thành hai đầu ra: 0.01 BTC cho Brian và 0.09 BTC cho Tamara (Hình 6.7). Tamara ký một phần vào giao dịch này và gửi trực tiếp cho Brian off-chain.
4. Khi muốn trả thêm tiền (ví dụ thêm 0.01 BTC nữa), Tamara tạo giao dịch cam kết thứ hai với phân bổ mới: 0.02 BTC cho Brian và 0.08 BTC cho Tamara (Hình 6.8).
5. Brian có thể đóng kênh bất kỳ lúc nào bằng cách ký vào giao dịch cam kết mới nhất mà anh ta nhận được và phát sóng nó lên chuỗi khối Bitcoin. Brian luôn có động lực kinh tế để chọn giao dịch cam kết mới nhất vì nó chứa số tiền thanh toán cao nhất dành cho anh ta.

#### Kênh thanh toán song hướng với khóa thời gian (Bidirectional Payment Channels with Timelocks)
Khi dòng tiền có thể chảy theo cả hai hướng, một thách thức lớn phát sinh: làm thế nào để ngăn chặn một bên gian lận bằng cách phát sóng một giao dịch cam kết cũ vốn có lợi cho họ hơn lên chuỗi khối (ví dụ: phát sóng lại trạng thái lúc họ có nhiều tiền hơn, trước khi họ chuyển tiền cho đối tác).

Giải pháp ban đầu là sử dụng khóa thời gian giảm dần:
* Mỗi giao dịch cam kết mới được tạo ra sẽ có thời gian khóa `nLockTime` ngắn hơn giao dịch trước đó ít nhất một khối (Hình 6.9). Giao dịch mới nhất luôn có thời gian khóa ngắn nhất và do đó có quyền phát sóng sớm hơn tất cả các giao dịch cũ.
* **Nhược điểm:** Kênh thanh toán dạng này có tuổi thọ giới hạn (expiration date) buộc phải đóng trước khi thời gian khóa của giao dịch hoàn tiền ban đầu hết hạn. Đồng thời, số lượng giao dịch tối đa bị giới hạn nghiêm ngặt bởi khoảng cách của khóa thời gian ban đầu (ví dụ tối đa 1.007 giao dịch nếu thời gian khóa ban đầu là 1.008 khối).

#### Kênh thanh toán song hướng với cam kết thu hồi bất đối xứng (Asymmetric Revocable Commitments)
Để loại bỏ giới hạn về thời gian tồn tại và số lượng giao dịch, Lightning Network áp dụng cơ chế cam kết thu hồi bất đối xứng kết hợp giữa khóa thời gian tương đối và hình phạt kinh tế:
* Thay vì tạo ra một giao dịch cam kết chung, hai bên tạo ra hai giao dịch cam kết bất đối xứng khác nhau cho cùng một trạng thái số dư. 
* Xét từ góc độ của Tamara: Giao dịch cam kết do cô nắm giữ thiết lập rằng nếu cô tự ý phát sóng nó lên chuỗi khối để đóng kênh, đầu ra của cô sẽ bị khóa thời gian tương đối bằng command `CHECKSEQUENCEVERIFY` (ví dụ bắt buộc phải đợi sau 1.000 xác nhận mới được tiêu dùng). Ngược lại, đối tác Brian sẽ nhận được tiền của mình lập tức mà không có bất kỳ ràng buộc nào. Đầu ra bị khóa của Tamara còn có một điều kiện giải phóng thứ hai: nó có thể bị Brian tịch thu ngay lập tức nếu Brian cung cấp được một **khóa thu hồi (revocation key)** tương ứng.
* Khi hai bên tạo ra trạng thái giao dịch mới, Tamara chỉ có thể nhận được chữ ký của Brian cho trạng thái mới sau khi cô đã bàn giao khóa thu hồi của trạng thái cũ cho Brian. 
* Nếu Tamara cố tình gian lận bằng cách phát sóng trạng thái cũ lên chuỗi khối, đầu ra của cô sẽ bị khóa trong vòng 1.000 khối. Trong khoảng thời gian trì hoãn này, Brian—người đã nắm giữ khóa thu hồi của trạng thái cũ đó—có thể lập tức phát sóng giao dịch hình phạt để tịch thu toàn bộ số tiền bị khóa của Tamara. Hình phạt kinh tế tàn khốc này (mất trắng toàn bộ số dư trong kênh) triệt tiêu hoàn toàn động lực gian lận của các bên.

**Nhược điểm:** Cơ chế này đòi hỏi các bên phải duy trì trạng thái online liên tục để giám sát chuỗi khối. Nếu Tamara phát sóng trạng thái cũ mà Brian không online trong vòng 1.000 khối để thực hiện lệnh phạt, số tiền gian lận sẽ được giải phóng cho Tamara. Để giải quyết rào cản này, người dùng có thể thuê các dịch vụ bên thứ ba gọi là **Tháp canh (Watchtowers)** để giám sát chuỗi khối hộ họ mà không cần tiết lộ thông tin nhạy cảm về danh tính hay dòng tiền giao dịch.

#### Mạng lưới Lightning (Lightning Network)
Để tránh việc mỗi người dùng phải mở kênh trực tiếp với mọi người dùng khác trong mạng lưới (yêu cầu số lượng kênh khổng lồ bằng $n(n-1)/2$), Lightning Network cho phép định tuyến dòng tiền qua các kênh trung gian có sẵn. Tamara có thể gửi tiền cho Emanuel thông qua trung gian Brian (Tamara -> Brian -> Emanuel) (Hình 6.11).

Để loại bỏ hoàn toàn yếu tố lòng tin đối với các nút trung gian, Lightning sử dụng giải pháp **Hợp đồng khóa thời gian băm (Hash Time-Locked Contracts - HTLC)**:
1. Emanuel tạo một số ngẫu nhiên bí mật $m$ (gọi là preimage) và tính toán giá trị băm $h = H(m)$. Emanuel gửi $h$ cho Tamara.
2. Tamara thiết lập một hợp đồng HTLC với Brian trong kênh của họ: Brian chỉ có thể nhận 0.01 BTC từ Tamara nếu Brian cung cấp được mã bí mật $m$ khớp với $h$ trong vòng một khoảng thời gian khóa (ví dụ $t+1$ khối).
3. Brian tiếp tục thiết lập một hợp đồng HTLC tương tự với Emanuel trong kênh của họ: Emanuel chỉ có thể nhận 0.01 BTC từ Brian nếu Emanuel cung cấp được mã bí mật $m$ trong vòng một khoảng thời gian khóa ngắn hơn (ví dụ $t$ khối).
4. Emanuel tiết lộ mã bí mật $m$ cho Brian để nhận tiền trong kênh của họ. Lúc này, Brian đã có được $m$ và lập tức sử dụng nó để giải khóa và nhận tiền từ Tamara trong kênh của họ.
5. Nếu bất kỳ nút trung gian nào cố tình không chuyển tiếp tiền hoặc có sự cố xảy ra, các hợp đồng HTLC sẽ tự động hết hạn khi hết thời gian khóa và tiền tự động hoàn trả về cho chủ sở hữu ban đầu mà không có rủi ro thất thoát.

Các nút trung gian như Brian cung cấp dịch vụ định tuyến để kiếm thu nhập từ phí giao dịch. Do thị trường có tính cạnh tranh rất cao, phí giao dịch định tuyến Lightning cực kỳ rẻ, chỉ dao động trong khoảng vài satoshi. Việc tìm kiếm tuyến đường hiệu quả nhất (routing) là thách thức kỹ thuật lớn nhất của mạng lưới và đang được các nhóm phát triển nỗ lực chuẩn hóa.

---

## 6.3 SỰ CHẤP NHẬN (Adoption)
Mặc dù Bitcoin có thể được trao đổi lấy nhiều loại hàng hóa và dịch vụ, mức độ chấp nhận thực tế của nó vẫn thua xa so với các đồng tiền pháp định của chính phủ. 

### 6.3.1 Giao dịch như một chỉ báo hoạt động (Transactions as an Indicator of Activity)
Việc sử dụng số lượng giao dịch hàng ngày trên chuỗi khối (Hình 6.5) làm chỉ báo cho mức độ chấp nhận có thể dẫn đến các kết luận sai lệch, vì chỉ báo này không phản ứng với sự thay đổi giá trị của đơn vị Bitcoin theo thời gian. 

Nếu chúng ta nhìn vào khối lượng giao dịch tính bằng đơn vị Bitcoin (Hình 6.13), ta thấy một đỉnh nhọn khổng lồ vào cuối năm 2011. Tuy nhiên, nếu quy đổi khối lượng giao dịch đó ra giá trị USD tương ứng tại thời điểm giao dịch (Hình 6.14), ta thấy đỉnh nhọn năm 2011 trở nên rất nhỏ bé so với sự bùng nổ thực tế của dòng vốn vào cuối năm 2017.

Tuy nhiên, ngay cả khối lượng giao dịch tính bằng USD cũng cần được diễn giải một cách thận trọng:
1. Sổ cái Bitcoin sử dụng biệt danh (pseudonyms), do đó nhiều giao dịch thực chất chỉ là việc một người dùng tự chuyển tiền qua lại giữa các địa chỉ ví khác nhau của chính họ nhằm tái cấu trúc danh mục đầu tư.
2. Các số liệu trên chuỗi khối hoàn toàn bỏ qua các giao dịch nội bộ cực kỳ lớn diễn ra bên trong sổ hạch toán của các sàn giao dịch tập trung (như Binance, Coinbase). Giao dịch trên chuỗi chỉ thực sự xảy ra khi người dùng rút tiền từ sàn về ví cá nhân.
3. Các số liệu này cũng không ghi nhận khối lượng giao dịch khổng lồ được thực hiện ngoại chuỗi thông qua mạng lưới Lightning.

### 6.3.2 Lạm phát Bitcoin và Phí giao dịch (Bitcoin Inflation and Transaction Fees)
Bên cạnh phí giao dịch trực tiếp, người nắm giữ Bitcoin phải chịu một loại chi phí ẩn khác gọi là **"thuế lạm phát" (inflation tax)** do việc in thêm Bitcoin mới để trả thưởng cho thợ đào. Khi lượng Bitcoin lưu thông tăng lên (trong điều kiện tổng cầu không đổi), giá trị của mỗi đơn vị Bitcoin sẽ bị pha loãng. 

Hình 6.16 so sánh giá thực tế của Bitcoin (đường nét đứt) và mức giá lý thuyết nếu mạng lưới không tạo thêm coin mới kể từ ngày 1 tháng 1 năm 2013 (đường nét liền). Sự chênh lệch giữa hai đường cong cho thấy một người nắm giữ một đơn vị Bitcoin từ đầu năm 2013 đến cuối năm 2019 đã phải trả một khoản thuế lạm phát tích lũy lên tới khoảng 5.000 USD.

Khi phần thưởng khối giảm dần sau mỗi sự kiện halving và hoàn toàn biến mất vào năm 2140, an ninh của mạng lưới Bitcoin sẽ phải dựa hoàn toàn vào phí giao dịch. Nếu doanh thu từ phí giao dịch không đủ lớn để bù đắp chi phí vận hành phần cứng của thợ đào, năng lực băm (hashing power) bảo vệ mạng lưới sẽ suy giảm nghiêm trọng, khiến chuỗi khối dễ bị tổn thương trước các cuộc tấn công 51%. 

Tuy nhiên, trong thực tế, các mỏ đào lớn không hoạt động ẩn danh mà kiểm soát tỷ lệ băm rất lớn, họ có động lực kinh tế mạnh mẽ trong việc duy trì uy tín và sự bảo mật của hệ thống để bảo vệ giá trị cho số Bitcoin mà họ đang nắm giữ và các khoản đầu tư thiết bị dài hạn.

### 6.3.3 Mệnh giá (Denomination)
Do sự tăng giá mạnh mẽ của Bitcoin, giá cả của hầu hết các hàng hóa thông thường khi tính bằng BTC sẽ chứa rất nhiều chữ số thập phân sau dấu phẩy. Nhiều nghiên cứu tiếp thị chỉ ra rằng người tiêu dùng gặp rất nhiều khó khăn trong việc đọc, so sánh và diễn giải chính xác các số thập phân nhỏ (ví dụ, đa số mọi người không thể nhận biết ngay lập tức rằng số `0.0531` lớn gần gấp sáu lần so với số `0.0089329`).

Để giải quyết rào cản tâm lý này, cộng đồng Bitcoin đề xuất sử dụng các đơn vị mệnh giá nhỏ hơn để niêm yết giá cả hàng hóa, như trình bày trong **Bảng 6.4**:

*   1 Bitcoin = 1 BTC
*   1 Deci-Bitcoin = 0.1 BTC
*   1 Centi-Bitcoin = 0.01 BTC
*   1 Milli-Bitcoin (mBTC) = 0.001 BTC
*   1 Bit (Micro-Bitcoin) = 0.000001 BTC
*   1 Satoshi = 0.00000001 BTC

### 6.3.4 Thời gian xác nhận (Confirmation Time)
Chu kỳ tạo khối trung bình 10 phút của Bitcoin khiến nó không phù hợp cho các giao dịch thanh toán mua sắm trực tiếp yêu cầu tốc độ tức thì (như mua một ly cà phê). Để giải quyết rào cản này, các cửa hàng nhỏ lẻ có thể chấp nhận các giao dịch chưa có xác nhận (0-confirmation) vì rủi ro bị tấn công double-spend đối với các khoản thanh toán giá trị nhỏ là cực kỳ thấp. Đối với các giao dịch lớn hoặc yêu cầu tốc độ cao và an toàn tuyệt đối, việc sử dụng Lightning Network là giải pháp tối ưu nhất hiện nay vì nó mang lại tốc độ xác nhận tức thì.

### 6.3.5 Phân bổ tài sản của Bitcoin (Distribution of Bitcoin)
Một nghiên cứu năm 2014 ước tính có tối đa 1,2 triệu người thực sự sở hữu Bitcoin. Số liệu phân tích cấu trúc phân bổ tài sản vào tháng 2 năm 2019 được tổng hợp trong **Bảng 6.5**:

| Nhóm số dư ví (BTC) | Số lượng địa chỉ | Tỷ lệ % địa chỉ | Tỷ lệ % tích lũy địa chỉ | Tổng số dư (BTC) | Tỷ lệ % số dư | Tỷ lệ % tích lũy số dư |
|---|---|---|---|---|---|---|
| 0 – 0.001 | 11,258,106 | 48.57% | 100.00% | 2,269 | 0.01% | 100.00% |
| 0.001 – 0.01 | 5,188,202 | 22.38% | 51.43% | 21,128 | 0.12% | 99.99% |
| 0.01 – 0.1 | 4,156,992 | 17.93% | 29.05% | 136,881 | 0.78% | 99.87% |
| 0.1 – 1 | 1,852,902 | 7.99% | 11.12% | 587,735 | 3.35% | 99.09% |
| 1 – 10 | 572,704 | 2.47% | 3.12% | 1,506,996 | 8.58% | 95.74% |
| 10 – 100 | 134,271 | 0.58% | 0.65% | 4,397,511 | 25.05% | 87.16% |
| 100 – 1,000 | 14,745 | 0.06% | 0.07% | 3,719,447 | 21.19% | 62.11% |
| 1,000 – 10,000 | 1,709 | 0.01% | 0.01% | 4,320,975 | 24.61% | 40.92% |
| 10,000 – 100,000 | 102 | 0.00% | 0.00% | 2,289,181 | 13.04% | 16.31% |
| 100,000 – 1,000,000 | 5 | 0.00% | 0.00% | 573,958 | 3.27% | 3.27% |

Các số liệu cho thấy mức độ bất bình đẳng trong phân bổ tài sản là rất cao (chỉ số Gini lớn). Tại thời điểm tháng 2 năm 2019, gần 20% tổng lượng Bitcoin lưu hành được nắm giữ bởi chỉ 115 địa chỉ ví lớn nhất. Những chủ thể nắm giữ lượng tài sản khổng lồ này được gọi là các **"Cá voi Bitcoin" (Bitcoin whales)**.

Sự tập trung tài sản này tạo ra rủi ro hệ thống lớn:
* Các lệnh bán tháo quy mô lớn từ cá voi có thể gây áp lực sụt giảm giá nghiêm trọng. Một ví dụ điển hình xảy ra vào ngày 6 tháng 10 năm 2014, khi một cá voi chuyển 26.000 BTC lên sàn giao dịch BitStamp và đặt lệnh bán, lập tức khiến giá Bitcoin sụt giảm 10% (sự kiện này đi vào lịch sử cộng đồng với tên gọi *"Slay the Bearwhale"* - Hình 6.18).
* Nếu Satoshi Nakamoto—người được ước tính đang nắm giữ khoảng 1,1 triệu BTC trong các ví khởi thủy—quyết định bán tháo số coin này, nó sẽ tạo ra một cú sốc tâm lý cực kỳ nghiêm trọng hủy hoại hoàn toàn thị trường.

---

## 6.4 THÁCH THỨC CHÍNH TRỊ (Political Challenges)
Bitcoin không chỉ đối mặt với các thách thức kỹ thuật và kinh tế, mà còn phải đối phó với các thách thức chính trị và xã hội to lớn.

### 6.4.1 Tiêu thụ điện năng (Electricity Use)
Quy trình khai thác dựa trên cơ chế Proof of Work tiêu tốn một lượng điện năng khổng lồ. Chúng ta có thể ước tính lượng điện năng tiêu thụ này dựa trên mô hình kinh tế học cạnh tranh hoàn hảo, nơi chi phí biên ($MC$) để tạo ra một khối sẽ hội tụ về mức doanh thu biên ($MR$) nhận được từ khối đó: `MR = MC`.

Hãy cùng thực hiện một phép tính thô cho năm 2018 dưới các giả định đơn giản sau:
1. Doanh thu của thợ đào chỉ bao gồm phần thưởng khối 12.5 BTC (tạm thời bỏ qua phí giao dịch).
2. Giá Bitcoin ổn định ở mức trung bình 4.000 USD/BTC trong suốt năm 2018. Do đó, doanh thu biên của mỗi khối là `12.5 x 4,000 = 50,000 USD`.
3. Bỏ qua các chi phí cố định (mua sắm thiết bị, khấu hao, mặt bằng, làm mát...), giả định chi phí biến đổi duy nhất là tiền điện. Do đó, chi phí điện để khai thác một khối cũng bằng 50,000 USD.
4. Trung bình mỗi 10 phút có một khối được tạo ra, tương đương 144 khối/ngày và `144 x 365 = 52,560 khối/năm`.
5. Tổng số Bitcoin được tạo ra trong năm là `52,560 x 12.5 = 657,000 BTC`.
6. Tổng doanh thu của toàn bộ ngành khai thác trong năm là `657,000 x 4,000 = 2,628,000,000 USD`. Theo giả định kinh tế học, đây cũng chính là số tiền mà các thợ đào chi trả cho tiền điện tiêu thụ.
7. Thợ đào luôn tìm kiếm những khu vực có giá điện rẻ nhất để tối ưu hóa lợi nhuận. Giả định giá điện trung bình dành cho thợ đào là 10 cents (0.1 USD) cho mỗi kilowatt giờ (kWh). 
8. Tổng lượng điện tiêu thụ của mạng lưới Bitcoin trong năm 2018 ước tính là: `2,628,000,000 / 0.1 = 26,280,000,000 kWh` (26.28 TWh).

Để dễ hình dung, chúng ta so sánh con số này với lượng điện tiêu thụ quốc gia của một số nước vào năm 2014 (**Bảng 6.6**):

*   Hạng 63: Slovakia — 28,360,000,000 kWh
*   Hạng 64: Serbia — 26,910,000,000 kWh
*   **Mạng lưới Bitcoin (Ước tính 2018) — 26,280,000,000 kWh**
*   Hạng 65: Bahrain — 25,000,000,000 kWh
*   Hạng 66: Ireland — 25,000,000,000 kWh
*   Hạng 67: Oman — 25,000,000,000 kWh

Mặc dù lượng điện tiêu thụ là rất lớn, việc đánh giá nó dưới góc độ chuẩn mực xã hội là một vấn đề mang tính quan điểm cá nhân:
* Đối với những người ủng hộ, đây là chi phí hoàn toàn xứng đáng để duy trì hoạt động của một cơ sở dữ liệu chống kiểm duyệt toàn cầu và một hệ thống tài sản mã hóa không cần lòng tin, không cần cấp phép đầu tiên trong lịch sử nhân loại.
* Đồng thời, nguồn điện được thợ đào sử dụng phần lớn là năng lượng dư thừa có chi phí cực rẻ tại các nhà máy thủy điện hoặc các nguồn năng lượng tái tạo khó truyền tải đi xa.
* Hệ thống tài chính truyền thống tập trung cũng tiêu tốn nguồn năng lượng và tài nguyên khổng lồ (vận hành hàng vạn văn phòng chi nhánh, hệ thống điều hòa, điện chiếu sáng, chi phí đi lại, commutes của hàng triệu nhân viên ngân hàng...). Nếu cộng gộp toàn bộ chi phí của ngành tài chính truyền thống, lượng năng lượng tiêu thụ chắc chắn sẽ vượt xa chi phí duy trì mạng lưới Bitcoin.

### 6.4.2 Sự không chắc chắn về mặt pháp lý và Hoạt động bất hợp pháp (Regulatory Uncertainty and Illegal Activities)
Hiện tại chưa có bất kỳ dữ liệu đáng tin cậy nào về quy mô sử dụng Bitcoin cho các hoạt động bất hợp pháp như rửa tiền hay trốn thuế. Tuy nhiên, ngay từ giai đoạn đầu, các chính trị gia và cơ quan quản lý đã bày tỏ mối quan ngại sâu sắc rằng Bitcoin có thể trở thành công cụ đắc lực cho tội phạm ẩn danh tài chính.

Sự lo ngại này dẫn đến việc thiếu một cách tiếp cận pháp lý thống nhất trên quy mô quốc tế. Một số quốc gia cấm hoàn toàn việc sử dụng Bitcoin, trong khi các quốc gia khác áp dụng các luật phòng chống rửa tiền tiêu chuẩn. Hầu hết các quốc gia vẫn đang trong quá trình thảo luận để tích hợp Bitcoin vào khuôn khổ pháp lý hiện hành của họ.

Trong thực tế, kiến trúc sổ cái công khai của Bitcoin khiến nó trở thành một lựa chọn tồi cho các hoạt động bất hợp pháp. Sổ cái lưu trữ vĩnh viễn và công khai lịch sử của mọi giao dịch. Bằng các kỹ thuật phân tích chuỗi khối (blockchain forensics) và việc liên kết địa chỉ ví với các sàn giao dịch tập trung yêu cầu KYC, các cơ quan điều tra có thể dễ dàng truy vết và triệt phá các mạng lưới tội phạm (ví dụ vụ shutdown chợ đen Silk Road năm 2013). Tuy nhiên, sự xuất hiện của các giải pháp lớp thứ hai như Lightning Network có thể làm gia tăng tính ẩn danh của các dòng tiền giao dịch nhỏ và tạo ra những thách thức mới cho công tác quản lý trong tương lai.

---

## 6.5 BÀI TẬP CUỐI CHƯƠNG (Exercises)

### Bài tập 6.1
*Đề bài:* Nêu tên ba loại dự án stablecoin, bao gồm ví dụ cụ thể cho mỗi loại, và trình bày cách chúng cố gắng neo giữ giá trị của token vào một tài sản khác.
*Gợi ý lời giải:*
1. **Stablecoin thuật toán (Algorithmic Stablecoin):** Ví dụ dự án *Basis*. Neo giá bằng thuật toán điều chỉnh cung cầu tự động không thế chấp. Khi giá > 1 USD, hệ thống tự động in thêm stablecoin để tăng cung hạ giá. Khi giá < 1 USD, hệ thống phát hành trái phiếu stablecoin chiết khấu cao để hút bớt stablecoin khỏi thị trường, hứa hẹn trả stablecoin trong tương lai khi cung tiền mở rộng trở lại.
2. **Stablecoin thế chấp trên chuỗi (On-Chain Collateralized Stablecoin):** Ví dụ đồng *DAI* của Maker Platform. Sử dụng tài sản mã hóa trên chuỗi (như Ether) làm tài sản đảm bảo trong các hợp đồng thông minh (CDP) với cơ chế thế chấp vượt mức (tối thiểu 150%). Khi giá DAI > 1 USD, kích thích người dùng mở CDP vay thêm DAI để bán kiếm lời chênh lệch. Khi giá DAI < 1 USD, kích thích người đi vay mua DAI giá rẻ trên thị trường để trả nợ giải phóng Ether đảm bảo, từ đó tự động co giãn nguồn cung để duy trì peg 1 USD. Lãi suất chính sách (phí ổn định) được sử dụng để điều tiết.
3. **Stablecoin thế chấp ngoại chuỗi (Off-Chain Collateralized Stablecoin):** Ví dụ đồng *Tether (USDT)* hoặc *USDC*. Neo giá bằng cách gửi ký quỹ tiền pháp định (USD) hoặc tài sản tương đương tại các tài khoản ngân hàng truyền thống hoặc định chế lưu ký tập trung với tỷ lệ đảm bảo 1:1. Nhà phát hành cam kết luôn sẵn sàng mua lại stablecoin và hoàn trả USD theo tỷ lệ par (1 stablecoin = 1 USD).

### Bài tập 6.2
*Đề bài:* Chỉ ra sự khác biệt giữa tiền kỹ thuật số của ngân hàng trung ương (CBDC) và tiền mã hóa của ngân hàng trung ương (CBCC) và thảo luận tại sao một ngân hàng trung ương có thể e ngại sử dụng một chuỗi khối công khai với giao thức đồng thuận phi tập trung.
*Gợi ý lời giải:*
*   **Tiền kỹ thuật số của ngân hàng trung ương (CBDC - Central Bank Digital Currency):** Là phiên bản điện tử tập trung của tiền pháp định quốc gia, được quản lý trực tiếp trên sổ cái tập trung của ngân hàng trung ương hoặc các đại lý được ủy quyền (ngân hàng thương mại), không nhất thiết phải sử dụng công nghệ sổ cái phân tán (blockchain). Người dân mở tài khoản trực tiếp tại NHTW.
*   **Tiền mã hóa của ngân hàng trung ương (CBCC - Central Bank Cryptocurrency):** Là tài sản kỹ thuật số sử dụng công nghệ mật mã học và chạy trên mạng lưới phân tán công khai (permissionless), cho phép người dùng giao dịch ngang hàng ẩn danh không cần cấp phép (tương tự thiết kế của Bitcoin nhưng do NHTW phát hành).
*   **Lý do NHTW e ngại chuỗi khối công khai phi tập trung:**
    1. **Rủi ro danh tiếng và pháp lý:** Giao dịch không cần cấp phép và ẩn danh có thể bị lợi dụng cho hoạt động rửa tiền, tài trợ khủng bố, trốn thuế, phá vỡ hoàn toàn các quy định KYC/AML hiện hành của ngành tài chính.
    2. **Mất quyền kiểm soát cung tiền và tính ổn định:** Sổ cái phân tán công khai không cho phép NHTW can thiệp khẩn cấp để đóng băng tài sản hoặc đảo ngược giao dịch khi có sự cố hệ thống hoặc tấn công mạng.
    3. **Áp lực địa chính trị:** CBCC của một quốc gia lưu hành tự do ở quốc gia khác có thể gây mất ổn định cơ cấu tiền tệ của quốc gia đó, dẫn đến các tranh chấp ngoại giao và áp lực chính trị quốc tế.

### Bài tập 6.3
*Đề bài:* Mô tả ý tưởng đằng sau một giao dịch cam kết (commitment transaction) và cách khái niệm này được sử dụng trong bối cảnh của các kênh thanh toán.
*Gợi ý lời giải:*
*   **Ý tưởng:** Giao dịch cam kết là một giao dịch được ký một phần (hoặc ký hoàn toàn bởi một bên và giữ lại off-chain bởi bên kia) nhằm xác định cách thức phân bổ số dư hiện tại của kênh thanh toán đa chữ ký 2-of-2. Giao dịch này không được phát sóng lên chuỗi khối Bitcoin gốc mà được lưu trữ cục bộ bởi các bên tham gia để làm bằng chứng pháp lý giải quyết tranh chấp.
*   **Cách sử dụng:**
    * Trong kênh thanh toán, mỗi khi có giao dịch phát sinh, các bên sẽ tạo ra một giao dịch cam kết mới cập nhật tỷ lệ phân bổ số dư mới, ký một phần và trao đổi cho nhau.
    * Giao dịch cam kết mới nhất đại diện cho trạng thái hợp lệ hiện tại của kênh thanh toán. 
    * Khi muốn đóng kênh, bất kỳ bên nào cũng có thể bổ sung chữ ký của mình vào giao dịch cam kết mới nhất này và phát sóng lên chuỗi khối Bitcoin để rút tiền về ví cá nhân của mình. Việc này giúp giảm số lượng giao dịch ghi nhận trên chuỗi xuống chỉ còn 2 giao dịch (mở kênh và đóng kênh), bất kể có bao nhiêu triệu giao dịch trung gian đã diễn ra trong kênh.

### Bài tập 6.4
*Đề bài:* Giải thích tại sao Bitcoin có thể không phải là một lựa chọn tốt cho các hoạt động bất hợp pháp. Hãy xem xét kiến trúc giao dịch bạn đã học ở chương 4. Bạn có kỳ vọng điều này sẽ thay đổi với mạng lưới Lightning không? Tại sao?
*Gợi ý lời giải:*
*   **Tại sao Bitcoin không tốt cho tội phạm:** Sổ cái Bitcoin hoàn toàn công khai, minh bạch và lưu trữ lịch sử giao dịch vĩnh viễn không thể tẩy xóa. Mặc dù địa chỉ ví sử dụng biệt danh (pseudonyms), nhưng bằng các công cụ phân tích dữ liệu lớn và truy vết địa chỉ ví (blockchain forensics), các cơ quan an ninh có thể dễ dàng xâu chuỗi các giao dịch, tìm ra nguồn gốc dòng tiền, và xác định danh tính thực tế của tội phạm khi họ thực hiện quy đổi Bitcoin sang tiền pháp định tại các sàn giao dịch yêu cầu KYC.
*   **Lightning Network có thay đổi điều này không?** Có, Lightning Network có thể làm tăng đáng kể tính ẩn danh và độ bảo mật của giao dịch:
    * Giao dịch Lightning diễn ra hoàn toàn off-chain và không bị ghi nhận vĩnh viễn trên sổ cái công khai Bitcoin gốc. Chỉ có giao dịch mở và đóng kênh được ghi nhận trên chuỗi.
    * Cơ chế định tuyến củ hành (onion routing) tương tự như mạng Tor khiến các nút trung gian trong tuyến đường chỉ biết được nút liền trước và nút liền sau của họ, hoàn toàn không biết được ai là người gửi ban đầu và ai là người nhận cuối cùng của dòng tiền. Do đó, việc truy vết dòng tiền Lightning là cực kỳ khó khăn, biến nó thành một công cụ ẩn danh cao hơn và có thể thu hút tội phạm sử dụng cho các giao dịch quy mô nhỏ hơn.

