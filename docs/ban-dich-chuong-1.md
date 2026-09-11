# BẢN DỊCH CHƯƠNG 1: BỐI CẢNH CỦA LÝ THUYẾT TIỀN TỆ
**Sách:** Bitcoin, Blockchain, and Cryptoassets: A Comprehensive Introduction  
**Tác giả:** Fabian Schär và Aleksander Berentsen  
**Nhà xuất bản:** MIT Press, 2020  
**Bản dịch tiếng Việt được thực hiện bởi Gemini Notebook**  

---

## LỜI GIỚI THIỆU CHƯƠNG 1
Bitcoin được phát triển với mục tiêu tạo ra một loại đơn vị tiền tệ mới. Như chúng tôi sẽ trình bày trong cuốn sách này, các ứng dụng khả thi của công nghệ Bitcoin còn mở rộng ra xa hơn nhiều so với một đơn vị tiền tệ đơn thuần. Tuy nhiên, để nắm bắt được các đặc điểm đặc biệt của công nghệ Bitcoin, trước hết người đọc phải được làm quen một cách đầy đủ với nguồn gốc của Bitcoin và chủ đề về tiền tệ [21].

Trong lý thuyết tiền tệ hiện đại, tiền được mô tả như là **"trí nhớ"** (memory) [130]. Nguồn gốc của định nghĩa này xuất phát từ quan sát thực tế rằng mọi người làm ơn cho nhau hàng ngày mà không cần được đền đáp ngay lập tức. Ví dụ, những "món quà" kiểu này được trao đổi trong gia đình, giữa bạn bè, hoặc tại nơi làm việc giữa các đồng nghiệp với nhau. Làm việc nhà, nhận một nhiệm vụ không mấy ai ưa thích ở văn phòng, hay gửi lời mời ăn tối tiếp theo cho bạn bè chỉ là một vài ví dụ về hành vi như vậy. Mỗi ngày, chúng ta tham gia vào hàng tá mối quan hệ **"tặng quà"** (gift-giving) như thế [22, 26].

Nhân tố đặc trưng cho các mối quan hệ này là tất cả các cá nhân liên quan đều tự ghi nhớ (keep an account) về nghĩa vụ nợ hiện tại của họ. Các tài khoản này không được ghi chép bằng văn bản; thay vào đó, chúng được ghi lại trong sổ cái tiềm thức trong trí nhớ của những người tham gia [22, 373]. Mối quan hệ trao đổi này hoạt động trơn tru dựa trên sự tin tưởng lẫn nhau và sự đồng thuận mang tính chủ quan. Tuy nhiên, nếu một người tham gia liên tục nhận các đặc ân mà không bao giờ đền đáp, lòng tin sẽ bị xói mòn và mối quan hệ hữu nghị sẽ bị đe dọa [22, 23].

Để một hệ thống **"tặng quà"** hoạt động hiệu quả, cần phải có một cơ chế để đạt được sự đồng thuận. Sự đồng thuận thường đạt được khi những người tham gia trò chuyện với nhau và giải quyết các khác biệt của họ. Trong thực tế, chúng ta thấy rằng việc trao đổi quà tặng và đặc ân diễn ra trôi chảy khi các thành viên hiểu rõ về nhau và nhóm có quy mô nhỏ. Trong các nhóm lớn, hoặc trong các nhóm mà những người tham gia ẩn danh, hệ thống này có xu hướng sụp đổ vì việc đạt được sự đồng thuận trở nên khó khăn. Trong các nhóm như vậy, **"việc tặng quà" được thay thế bằng việc trao đổi tiền**. Tiền chiếm lĩnh vai trò của trí nhớ trong các xã hội phức tạp với các mối quan hệ thương mại phức tạp. Tiền theo dõi tài khoản thương mại toàn cầu về các đặc ân. **Tiền là trí nhớ** [23, 24].

Một hệ thống thanh toán quy định cách thức tiền tệ được đại diện, cách nó được tạo ra, và cách thức chuyển giao quyền sở hữu các đơn vị tiền tệ diễn ra. Để hiểu rõ hơn về cách hệ thống Bitcoin vận hành, việc xem xét nhanh các hệ thống thanh toán truyền thống là điều vô cùng hữu ích [24].

Hãy bắt đầu bằng việc xem xét **tiền mặt** (cash); tức là tiền xu và tiền giấy. Tiền xu và tiền giấy là các thực thể vật lý. Điều này mang lại một lợi thế lớn, vì quyền sở hữu luôn được xác định rõ ràng. Quyền sở hữu một tờ tiền giấy hoặc một đồng xu được chuyển giao dưới dạng thanh toán từ người mua sang người bán hàng hóa. Điều này cho phép những người không quen biết nhau có thể giao dịch ẩn danh với nhau. Hơn nữa, bất kỳ tác nhân nào cũng có thể tham gia vào hệ thống thanh toán bằng tiền mặt; không ai có thể bị loại trừ. Đó là một quyền tiếp cận không cần cấp phép (permissionless access) [24, 25].

Tuy nhiên, tiền mặt có một nhược điểm lớn vì nó đòi hỏi sự gần gũi về mặt vật lý giữa người mua và người bán. Hạn chế này đã trở nên đặc biệt rõ ràng với sự trỗi dậy của internet. Ngoài ra, việc nắm trữ một lượng tiền mặt lớn là không hấp dẫn do vấn đề an toàn và chi phí. Vì những lý do này, ý tưởng thay thế tiền mặt vật lý bằng tiền kỹ thuật số đã sớm xuất hiện. Trong một mô hình triển khai ngây thơ, người mua sẽ gửi một đồng xu kỹ thuật số cho người bán dưới dạng một tệp văn bản. Vấn đề là tệp tiền kỹ thuật số này có thể bị sao chép vô số lần. Người mua có thể gửi cùng một đồng xu kỹ thuật số đó cho nhiều người bán hoặc thậm chí giữ lại các bản sao của đồng xu đó [25, 377].

Tình thế tiến thoái lưỡng nan về việc "sao chép" này được gọi trong tài liệu chuyên ngành là **vấn đề chi tiêu song trùng (double-spending problem)**. Có hai giải pháp cho vấn đề này [377, 378]:

1. **Giải pháp thứ nhất:** Chỉ định một tổ chức đứng ra giám sát tất cả các khoản thanh toán điện tử. Điều này đặc biệt bao gồm việc xác minh rằng người mua là chủ sở hữu hợp pháp của các đồng xu kỹ thuật số sẽ được sử dụng để thanh toán cho hàng hóa. Trên toàn thế giới, các hệ thống thanh toán điện tử phổ biến hiện nay đều dựa trên giải pháp đầu tiên này. Người dùng của các hệ thống thanh toán này thanh toán bằng tiền điện tử, còn được gọi là **tiền gửi (deposit money), tiền ngân hàng (bank money), hoặc tiền ghi sổ (book money)**. Tiền điện tử là tiền ảo vì nó không tồn tại dưới dạng vật lý. Nó được tạo ra bởi các ngân hàng thương mại, những tổ chức chịu trách nhiệm ghi sổ kế toán chính xác. Do đó, nó phụ thuộc vào một cơ quan trung ương [378, 379].
2. **Giải pháp thứ hai:** Hệ thống Bitcoin cung cấp giải pháp thứ hai này, vì nó giải quyết vấn đề *chi tiêu song trùng* mà không cần một cơ quan trung ương quản lý (xem Chương 2). Để đảm bảo hệ thống này hoạt động, có một cơ chế thiết lập sự đồng thuận và nó rất giống với việc trao đổi các đặc ân giữa các thành viên gia đình, bạn bè và đồng nghiệp. Trái ngược với các quy tắc đồng thuận mang tính chủ quan đơn giản chi phối *việc tặng quà*, hệ thống Bitcoin đảm bảo một sự đồng thuận khách quan, có thể kiểm chứng trên toàn cầu, sao cho tại bất kỳ thời điểm nào, quyền sở hữu liên kết với mỗi đơn vị Bitcoin đều được thiết lập vững chắc. Do đó, hệ thống Bitcoin thực hiện chức năng *trí nhớ* trong các xã hội phức tạp nhưng không cần cơ quan trung ương nào để quản lý nó [26, 27].

Để hiểu đầy đủ giá trị của một loại tiền mã hóa như Bitcoin, trước tiên chúng ta phải hiểu lý thuyết tiền tệ. Phần còn lại của chương này sẽ cung cấp sự hiểu biết về các nền tảng của lý thuyết tiền tệ [27, 28].

---

## 1.1 NGUỒN GỐC CỦA ĐƠN VỊ TIỀN TỆ (Origin of a Monetary Unit)
Lý thuyết kinh tế của Carl Menger [154] gợi ý rằng tiền có thể tiến hóa mà không cần sự can thiệp của chính phủ. Ông đề xuất rằng một đơn vị tiền tệ xuất hiện một cách tự phát từ một quá trình trong đó một loại hàng hóa được giao dịch thường xuyên dần trở thành một phương tiện trao đổi được chấp nhận rộng rãi. Sự điều phối xã hội như vậy không đòi hỏi bất kỳ quyết định chính thức hay quyết định lập pháp nào, mà thay vào đó có thể được thúc đẩy bởi nhu cầu đã tồn tại sẵn [94]. Hơn nữa, có những hiệu ứng mạng lưới mạnh mẽ. Càng có nhiều người tham gia thị trường sử dụng một phương tiện trao đổi cụ thể, thì tiện ích mà phương tiện này mang lại càng lớn; nghĩa là sự thống trị của phương tiện trao đổi có tác dụng tự củng cố [28, 29, 30].

Có thể giả định rằng các đơn vị tiền tệ ban đầu đã bắt nguồn theo cách này. Ở các khu vực khác nhau và trong các thời kỳ khác nhau, nhiều loại hàng hóa và hình thức trừu tượng khác nhau đã được sử dụng làm tiền. Nhiều ví dụ ban đầu này chia sẻ chung một đặc điểm: chúng phục vụ như một loại lương thực cơ bản hoặc như một món đồ trang sức (nghi lễ), tạo ra nhu cầu không ngừng [30]. Mặc dù đây không phải là một danh sách đầy đủ, một số ví dụ về điều này bao gồm đá, gia súc, răng cá voi, vỏ sò và lông chim [30, 31].

---

## 1.2 CHỨC NĂNG CỦA ĐƠN VỊ TIỀN TỆ (Functions of a Monetary Unit)
Các đơn vị tiền tệ thực hiện ba chức năng chính (như được minh họa trong Hình 1.1) [31, 384]:
* **Phương tiện trao đổi (Medium of exchange):** Chúng tạo điều kiện thuận lợi cho thương mại và cải thiện việc phân bổ hàng hóa và dịch vụ.
* **Đơn vị hạch toán (Unit of account):** Chúng đóng vai trò là một hệ quy chiếu phổ quát và đơn giản hóa việc định giá so sánh các hàng hóa và dịch vụ.
* **Phương tiện lưu trữ giá trị (Store of wealth/value):** Các đơn vị tiền tệ có thể được sử dụng để tiết kiệm.

Các chức năng này được mô tả toàn diện trong các phần sau [31, 32].

### 1.2.1 Phương tiện trao đổi (Medium of Exchange)
Một phương tiện trao đổi là không thể tiến hành được trong một nền kinh tế hiện đại đặc trưng bởi sự chuyên môn hóa lao động; nghĩa là khi các tác nhân kinh tế chuyên môn hóa và chỉ sản xuất một tập hợp con nhỏ các hàng hóa. Sự chuyên môn hóa như vậy chỉ khả thi nếu tất cả các hàng hóa khác có thể được mua lại thông qua thương mại và do đó một nền kinh tế có sự phân công lao động nhất thiết phải là một nền kinh tế trao đổi [32].

Trong một nền kinh tế không sử dụng tiền, hàng hóa và dịch vụ chỉ có thể được mua thông qua trao đổi hàng-đổi-hàng (barter) [32, 386]. Một người sở hữu một ổ bánh mì nhưng muốn tiêu dùng một bình sữa trước tiên sẽ phải tìm một người sở hữu một bình sữa và muốn tiêu dùng một ổ bánh mì. Chỉ khi đó cả hai bên mới sẵn lòng và có thể giao dịch hàng hóa. Do đó, một thỏa thuận đơn giản là không đủ. Một giao dịch hàng-đổi-hàng chỉ có thể được kết thúc nếu bên này có thứ bên kia muốn và ngược lại. Vấn đề này, được biết đến trong tài liệu chuyên ngành là **sự trùng khớp ngẫu nhiên song trùng về nhu cầu (double coincidence of wants)**, khiến việc tìm kiếm đối tác thương mại phù hợp trở nên khó khăn [33, 386, 387].

Một yếu tố cản trở khác là sự gia tăng số lượng các cặp hàng hóa có thể giao dịch. Với một số lượng tùy ý $n$ các hàng hóa và dịch vụ khác nhau, sẽ có $\frac{n(n-1)}{2}$ cặp hàng hóa giao dịch khác nhau. Trong các nền kinh tế có số lượng hàng hóa và dịch vụ vừa phải, trao đổi trực tiếp có khả năng gặp một vài bất lợi. Ngay khi một hệ thống kinh tế trở nên phức tạp hơn, nó sẽ bao gồm hàng triệu chủ thể, hàng hóa và dịch vụ. Việc tìm kiếm các đối tác thương mại phù hợp (hoặc một cặp hàng hóa có thể giao dịch cụ thể) khi đó sẽ phát sinh chi phí đáng kể [33, 34, 387].

Tuy nhiên, nếu một loại hàng hóa được chấp nhận bởi tất cả các thành viên trong nền kinh tế, thì tất cả các giao dịch thương mại có thể được thanh toán bằng cách sử dụng hàng hóa này làm phương tiện trao đổi. Một sự trùng khớp nhu cầu đơn giản là đủ cho giao dịch, và do đó số lượng các cặp hàng hóa giao dịch có liên quan ngay lập tức được giảm đi theo hệ số $n$, chỉ còn lại $n-1$ cặp hàng hóa tiềm năng [35, 36, 389].

*Hình 1.2 minh họa số lượng các cặp hàng hóa có thể giao dịch trong nền kinh tế khi có và không có sử dụng đơn vị tiền tệ. Nó cho thấy số lượng các cặp hàng hóa tăng vọt như thế nào khi số lượng hàng hóa tăng lên [36, 390].*

### 1.2.2 Đơn vị hạch toán (Unit of Account)
Một đơn vị hạch toán cho phép giá trị của tất cả hàng hóa và dịch vụ được biểu thị bằng các đơn vị của cùng một thang tham chiếu và được so sánh. Lượng thông tin cần thiết cho một cái nhìn toàn diện về thị trường nhờ đó được giảm bớt một cách đáng kể. Thay vì phải điều chỉnh linh hoạt tỷ lệ tương ứng của $\frac{n(n-1)}{2}$ cặp hàng hóa giao dịch, một đơn vị hạch toán cung cấp một hệ quy chiếu phổ quát để đánh giá các loại hàng hóa và dịch vụ khác nhau. Một khi giá của tất cả hàng hóa và dịch vụ được biểu thị bằng các đơn vị tiền tệ, thì chỉ cần một giá trị trao đổi tiền tệ duy nhất cho mỗi hàng hóa (tức là $n-1$) [36, 37, 390]. Sự đơn giản hóa này đảm bảo tính minh bạch hơn trên thị trường, đồng thời giảm chi phí tìm kiếm và chi phí giao dịch thương mại [38, 392].

Hầu hết các trường hợp, các đơn vị tiền tệ kết hợp chức năng của một phương tiện trao đổi và một đơn vị hạch toán. Tuy nhiên, hai chức năng này có thể dễ dàng tách biệt (xem Hộp 1.1) [38, 392].

> **HỘP 1.1: CÁC ĐƠN VỊ HẠCH TOÁN ỦY THÁC NGOÀI (Outsourced Units of Account)**
> Trong hầu hết các nền kinh tế, phương tiện trao đổi đảm nhận chức năng của một đơn vị hạch toán. Tuy nhiên, điều này không phải lúc nào cũng đúng, như được chỉ ra bởi các ví dụ sau [38, 392]:
>
> * **Thời Trung Cổ:** Sự đa dạng của các loại tiền xu và sự thay đổi liên tục trong hàm lượng kim loại quý của chúng đã dẫn đến việc đồng bảng (pounds), shilling và xu (pence) được sử dụng làm đơn vị hạch toán, trong đó một bảng tương đương với 20 shilling hoặc 240 pence. Điều này cho phép áp dụng một mức giá phổ quát và tính toán những thay đổi về giá trị của một đồng xu cụ thể mà không cần điều chỉnh giá niêm yết của hàng hóa [39, 393].
> * **Ngày nay:** Vẫn có những ví dụ về các trường hợp chức năng của một đơn vị hạch toán được tách biệt khỏi phương tiện trao đổi. Chỉ số *Unidad de Fomento* ở Chile (CLF) là một chỉ số giá quốc gia được điều chỉnh theo lạm phát, được xác định so với đồng nội tệ (peso) và được công bố hàng ngày. Giá mua sắm ở Chile được biểu thị bằng CLF. Điều này tránh được chi phí hành chính khi thực hiện các điều chỉnh giá khi đồng peso bị mất giá. Để tính giá bằng peso, các tác nhân chỉ cần áp dụng một tỷ giá hối đoái duy nhất [394].

### 1.2.3 Phương tiện lưu trữ giá trị (Store of Value)
Chức năng lưu trữ giá trị của tiền cho phép các tác nhân tự bảo hiểm trước các cú sốc thanh khoản. Điều này cho phép làm mượt tiêu dùng (consumption smoothing) và bảo vệ chống lại các chi phí phát sinh ngoài dự kiến. Một phương tiện trao đổi luôn là một phương tiện lưu trữ giá trị vì luôn có một khoảng thời gian giữa việc nhận tiền và chi tiêu nó. Ngược lại, có nhiều tài sản được sử dụng để lưu trữ các khoản tiết kiệm, chẳng hạn như vàng hoặc bất động sản, nhưng lại không được sử dụng làm phương tiện trao đổi [40, 395].

---

## 1.3 CÁC THUỘC TÍNH CƠ BẢN CỦA TIỀN (Fundamental Properties of Money)
Để thực hiện ba chức năng của tiền được trình bày trong Mục 1.2, các đơn vị tiền tệ phải có các thuộc tính cơ bản sau [40, 41, 395]:

* **Khả năng lưu trữ (Storability):** Việc sử dụng đơn vị tiền tệ như một *phương tiện trao đổi* và một *phương tiện lưu trữ giá trị* phụ thuộc vào khả năng lưu trữ của nó. Các hàng hóa dễ hỏng hoặc nhạy cảm là không phù hợp. Điều tương tự cũng áp dụng cho các hàng hóa khó lưu trữ và do đó phát sinh chi phí lưu trữ cao [41, 396].
* **Khả năng chuyển nhượng (Transferability):** Để một vật thể được sử dụng làm *phương tiện trao đổi* hoặc *phương tiện lưu trữ giá trị*, cần phải có khả năng chuyển giao quyền sở hữu đối với nó mà không gặp phải những trở ngại hoặc chi phí đáng kể [41, 42, 396].
* **Tính chia nhỏ (Divisibility):** Chức năng *phương tiện trao đổi* đòi hỏi đơn vị tiền tệ (hoặc một phần nhỏ của nó) có thể được trao đổi cho bất kỳ số lượng hàng hóa hoặc dịch vụ nào được chọn. Do đó, tiền phải có tính chia nhỏ hoặc có sẵn ở các mệnh giá đủ nhỏ. Tiền không thể chia nhỏ tạo ra những phi hiệu quả đáng kể trong nền kinh tế [42, 397].
* **Tính đồng nhất (Homogeneity/Fungibility):** Các đơn vị tiền tệ (có cùng mệnh giá) phải đồng nhất; nghĩa là có tính thay thế và có thể hoán đổi cho nhau. Các hàng hóa không đồng nhất phải được đánh giá riêng lẻ mỗi khi chúng được giao dịch, điều này phát sinh chi phí giao dịch cao và thất bại trong việc thực hiện chức năng như một *phương tiện trao đổi* [42, 43, 397].
* **Khả năng xác thực (Verifiability):** Cả chức năng của *phương tiện trao đổi* và *phương tiện lưu trữ giá trị* đều đòi hỏi tính xác thực của các đơn vị tiền tệ có thể được kiểm chứng và các hành vi làm giả tiềm ẩn có thể bị phát hiện [43, 398].
* **Tính khan hiếm (Scarcity):** Tính sẵn có hạn chế của một đơn vị tiền tệ là một thuộc tính thiết yếu để sử dụng nó làm *phương tiện trao đổi*. Nếu một đơn vị tiền tệ có sẵn với số lượng không giới hạn, nó sẽ không có giá trị [43, 398].
* **Tính ổn định giá trị (Stability of value):** Chức năng *lưu trữ giá trị* và *đơn vị hạch toán* phụ thuộc vào một sự ổn định giá cả nhất định của đơn vị tiền tệ. Các hàng hóa có sự biến động cung cầu lớn theo mùa và ngẫu nhiên (ví dụ: nông sản) là không thích hợp [44, 399].

---

## 1.4 GIÁ TRỊ TIỀN TỆ (Monetary Value)
Giá trị thị trường của một đơn vị tiền tệ dựa trên ba thành phần chính [44, 399]:
$$\text{Giá trị thị trường} = \text{Giá trị nội tại} + \text{Cam kết thanh toán} + \text{Phụ phí thanh khoản}$$

* **Giá trị nội tại (Intrinsic value):** Liên quan đến giá trị vật chất, vốn có của vật thể. Giá trị này bắt nguồn từ tiện ích có được từ việc tiêu dùng hoặc sở hữu hàng hóa, hoặc tính hữu dụng của nó như một yếu tố sản xuất. Giá trị nội tại của một đơn vị tiền tệ độc lập với chức năng tiền tệ của vật thể đó [44, 45, 399, 400].
* **Cam kết thanh toán (Promise of payment):** Là một thành phần giá trị không được tích hợp một cách vật chất trong đơn vị tiền tệ. Trái ngược với giá trị nội tại, thành phần giá trị này phụ thuộc vào rủi ro của nhà phát hành (issuer risk). Nếu nhà phát hành cam kết không thực hiện nghĩa vụ của mình, thì thành phần giá trị này sẽ trở nên vô hiệu [45, 400].
* **Phụ phí thanh khoản (Liquidity premium):** Là kết quả của quyền chọn giao dịch linh hoạt đơn vị tiền tệ để lấy hàng hóa và dịch vụ. Quyền chọn này có tác động tích cực đến giá trị thị trường của đơn vị tiền tệ [46, 401].

Ba thành phần giá trị này tạo nên giá trị thị trường của ba loại đơn vị tiền tệ được chỉ ra trong Bảng 1.2 [46, 401]:

* **Bảng 1.1: Thành phần của một đơn vị tiền tệ**  
  $$\text{Giá trị nội tại} + \text{Cam kết thanh toán} + \text{Phụ phí thanh khoản} = \text{Giá trị thị trường của đơn vị tiền tệ}$$
* **Bảng 1.2: Các loại tiền tệ theo thành phần giá trị**  
  * Tiền hàng hóa (Commodity money): Có Giá trị nội tại ($+$) và Phụ phí thanh khoản ($+$).
  * Tiền tín dụng (Credit money): Có Cam kết thanh toán ($+$) và Phụ phí thanh khoản ($+$).
  * Tiền pháp định (Fiat money): Chỉ có Phụ phí thanh khoản ($+$).

### 1.4.1 Tiền hàng hóa (Commodity Money)
Tiền hàng hóa có một giá trị nội tại và thường chứa một phụ phí thanh khoản. Giá trị thị trường có thể cao hơn giá trị nội tại do kết quả của phụ phí thanh khoản. Giá trị nội tại vẫn tồn tại nếu hàng hóa đó mất đi chức năng làm phương tiện trao đổi, vì trong trường hợp này, hàng hóa đó vẫn có thể được tiêu dùng hoặc sử dụng làm nhân tố sản xuất [47, 402].

Các vật thể sau đây là những ví dụ về các mặt hàng được sử dụng làm tiền hàng hóa: vỏ sò ở Châu Phi và Trung Quốc, vòng đeo tay và đồ trang sức ở New Guinea, quần áo (da thú) ở Bắc Mỹ cũng như tiền kim loại ở nhiều khu vực khác trên thế giới. Gia súc và lương thực cơ bản cũng thường được sử dụng làm tiền hàng hóa [47, 48, 402].

### 1.4.2 Tiền tín dụng (Credit Money)
Tiền tín dụng là một cam kết thanh toán và không sở hữu giá trị nội tại. Thông thường, nó là một mảnh giấy hoặc một bản ghi kỹ thuật số tuyên bố rằng nhà phát hành sẽ thực hiện thanh toán vào một ngày cụ thể trong tương lai. Loại cam kết thanh toán này được gọi là một giấy nhận nợ IOU ("I owe you") [48, 403].

Về cơ bản, các cam kết thanh toán có thể có bất kỳ hình thức nào; ví dụ: "Tôi nợ cá nhân X một con bò vào ngày 1 tháng 7, 2090" hoặc "Tôi nợ cá nhân X một chuyến đi xe trượt tuyết vào ngày 30 tháng 1, 2030." Thông thường nhất, nghĩa vụ nợ được biểu thị bằng đơn vị hạch toán phổ biến [48, 49, 404].

Rủi ro vỡ nợ (default risk) đóng một vai trò quan trọng trong việc xác định giá trị thị trường của khoản thanh toán được cam kết. Về mặt này, uy tín của nhà phát hành phải được xem xét vì một lời hứa giao một ounce vàng được đưa ra bởi cá nhân A có thể có giá trị thị trường hoàn toàn khác so với cùng lời hứa đó được đưa ra bởi cá nhân B [49, 404].

Một cam kết thanh toán trở thành tiền khi nó được chấp nhận rộng rãi trong giao dịch. Ở hầu hết các quốc gia, tiền gửi ngân hàng (bank deposits), vốn là nghĩa vụ nợ của ngân hàng nhận tiền gửi tương ứng, được sử dụng để thực hiện các khoản thanh toán điện tử. Tiền gửi ngân hàng không có gì khác ngoài một lời hứa của ngân hàng thương mại rằng họ sẽ đổi tiền gửi lấy tiền tệ do chính phủ phát hành (tiền giấy và tiền xu) vào bất kỳ lúc nào (trả ngay - on sight) [50, 405].

> **HỘP 1.2: NGUỒN GỐC CỦA TIỀN GIẤY (The Origins of Paper Money)**
> Những ví dụ ban đầu về tiền giấy tương tự như các cam kết thanh toán khác vì chúng được bảo đảm bằng một tài sản thực (thường là vàng). Những tờ giấy này mang một cam kết có thể chuyển đổi thành một lượng kim loại quý đã thỏa thuận trước đó hoặc thành các hàng hóa khác. Tính chất tín dụng của các tờ tiền này trở nên đặc biệt rõ ràng khi nguồn gốc của chúng được xem xét.
>
> Những tờ tiền giấy/hối phiếu đầu tiên bắt nguồn từ Trung Quốc dưới thời nhà Đường (những năm 618–907) như một thỏa thuận tín dụng giữa các cá nhân tư nhân. Tùy thuộc vào uy tín và khả năng tín dụng của nhà phát hành, hối phiếu này có thể lưu thông và phục vụ như một phương tiện thay thế tiền tệ cho các chuỗi tiền đồng *Khai Nguyên* (Kai Yuan) [51, 406].

Tương tự như các loại tiền tệ khác, tiền tín dụng cũng có thể bao gồm một phụ phí thanh khoản. Phụ phí thanh khoản có thể làm cho giá trị thị trường của tiền tín dụng cao hơn giá trị thị trường của cam kết thanh toán liên kết với nó [52, 407].

### 1.4.3 Tiền pháp định (Fiat Money)
Cụm từ "tiền pháp định" (fiat money) bắt nguồn từ thuật ngữ tiếng Latin *fiat* ("hãy để nó được tạo ra"), minh họa rằng tiền pháp định không sở hữu giá trị nội tại lẫn cam kết thanh toán, và giá trị của nó do đó không có cơ sở nền tảng: nó phát sinh từ hư vô (hãy để có tiền). Giá trị của nó thực sự bắt nguồn duy nhất từ phụ phí thanh khoản của chính nó, và nếu nó ngừng thực hiện chức năng tiền tệ, giá trị của nó có thể giảm về bằng không [52, 53, 407].

Các đồng tiền như đô la Mỹ (USD), euro (EUR), hoặc franc Thụy Sĩ (CHF) thuộc danh mục tiền pháp định. Các tờ tiền giấy không thể bị tiêu dùng cũng không thể tích hợp vào một quy trình sản xuất, chúng cũng không được bảo đảm bằng vàng hay bất kỳ hàng hóa có giá trị nền tảng nào khác. Sự ổn định giá trị của tiền tệ được đảm bảo duy nhất bởi các ngân hàng trung ương, những tổ chức có quyền độc quyền phát hành tiền tệ và nghĩa vụ pháp lý trong việc đảm bảo giá trị của nó luôn ổn định [53, 408].

Ở Thụy Sĩ và ở nhiều quốc gia khác, tiền giấy, và ở một mức độ nào đó cả tiền xu, là phương tiện thanh toán hợp pháp (legal tender). Điều 3 của Đạo luật Liên bang về Tiền tệ và Công cụ Thanh toán (CPIA) quy định một "nghĩa vụ phải chấp nhận"; nghĩa là "mọi người phải chấp nhận tiền giấy Thụy Sĩ trong thanh toán mà không có hạn chế" [199, 409]. Cơ sở pháp lý này đảm bảo rằng có nhu cầu đối với tiền giấy Thụy Sĩ và nó thúc đẩy phụ phí thanh khoản của đơn vị tiền Thụy Sĩ. Hơn nữa, sự hỗ trợ của nhà nước có thể có tác dụng ổn định đối với một danh mục tiền tệ vốn dĩ rất biến động về mặt nền tảng [54, 409].

Tiền pháp định là một hiện tượng tương đối trẻ. Cho đến những năm 1970, tiền giấy vẫn được bảo đảm bằng vàng, trực tiếp hoặc gián tiếp, và do đó đại diện cho tiền tín dụng. Tuy nhiên, do việc mất đi sự bảo đảm bằng vàng và giá trị nội tại vật chất không đáng kể của một tờ tiền giấy, danh mục tiền pháp định đã ra đời. Như chúng ta sẽ thấy sau này, Bitcoin cũng thuộc danh mục này [55, 410].

> **HỘP 1.3: QUYẾT ĐỊNH CHẤP NHẬN MỘT ĐỒNG TIỀN PHÁP ĐỊNH NHƯ MỘT TRÒ CHƠI PHỐI HỢP (Decision to Accept a Fiat Currency as a Coordination Game)**
> Giá trị của một đồng tiền pháp định và, như chúng ta sẽ thấy, giá trị của một đơn vị Bitcoin, dựa trên kỳ vọng về sự chấp nhận và khả năng tiếp thị của nó trong tương lai (phụ phí thanh khoản). Khả năng một người gặp được một người tham gia thị trường sẽ chấp nhận nó làm thanh toán càng cao, thì họ càng sẵn lòng chấp nhận nó ngày hôm nay [55, 56, 410].
>
> Tình huống này được minh họa trong đồ thị dưới đây. Hãy xem xét một tác nhân đang cân nhắc xem có nên chấp nhận tiền pháp định làm thanh toán hay không. Giả sử $\Pi$ đại diện cho xác suất một đối tác thương mại trong tương lai sẽ chấp nhận đơn vị tiền tệ đó làm thanh toán và $\pi$ là xác suất chấp nhận của tác nhân đó. Hàm phản hồi $\pi = \pi(\Pi)$ là phản ứng tốt nhất của tác nhân đối với một kỳ vọng nhất định về giá trị của $\Pi$.
>
> * Đối với các giá trị thấp của $\Pi < \hat{\Pi}$, phản ứng tốt nhất là không chấp nhận đơn vị tiền tệ đó; tức là $\pi(\Pi) = 0$.
> * Đối với các giá trị cao của $\Pi > \hat{\Pi}$, phản ứng tốt nhất là chắc chắn chấp nhận đơn vị tiền tệ đó; tức là $\pi(\Pi) = 1$.
> * Cuối cùng, đối với $\Pi = \hat{\Pi}$, phản ứng tốt nhất là $\pi(\Pi) \in [0, 1]$; nghĩa là bất kỳ xác suất chấp nhận nào cũng mang lại cùng một lợi ích [56, 57, 411, 412].
>
> *Hình ảnh mô tả Trò chơi phối hợp với ba trạng thái cân bằng Nash: A, B, và C. Hai trạng thái cân bằng ngoài đại diện cho các tình huống không ai chấp nhận (C) hoặc tất cả đều chấp nhận đơn vị tiền tệ (A). Giá trị thị trường của tiền tệ tại trạng thái cân bằng C bằng không, và tại trạng thái cân bằng A là một giá trị dương. Trạng thái cân bằng thứ ba (B) xuất hiện tại ngưỡng $\hat{\Pi}$ [57, 413, 414].*

---

## 1.5 CẤU TRÚC KIỂM SOÁT TIỀN TỆ (Monetary Control Structures)
Các đơn vị tiền tệ hiển thị các cấu trúc kiểm soát khác nhau, có thể được nắm bắt đại khái qua ba chiều: **tạo tiền (creation), đại diện (representation), và xử lý giao dịch (transaction processing)** [58, 414].

* **Tạo tiền:** Đề cập đến quy trình theo đó các đơn vị tiền tệ mới có thể được sản xuất [58].
* **Đại diện:** Liên quan đến việc giá trị của một đơn vị tiền tệ được gắn liền với một thực thể vật lý hay đơn vị đó được giao dịch thuần túy như một hình thức trừu tượng ảo [58, 414, 415].
* **Xử lý giao dịch:** Liên quan đến việc chuyển giao một đơn vị tiền tệ có thể được xử lý trên cơ sở độc lập, phi tập trung hay việc này phải được thực hiện bởi một cơ quan trung ương [59, 415].

### 1.5.1 Tạo tiền (The Creation of Money)
Để tiền có giá trị, số lượng của nó phải **khan hiếm**. Sự khan hiếm thường đạt được thông qua quy trình tạo tiền, quy trình này có thể diễn ra dưới hình thức **cạnh tranh** hoặc **độc quyền** [59, 415].

#### Tạo tiền cạnh tranh (Competitive Money Creation)
Trong một khuôn khổ tạo tiền cạnh tranh, mọi chủ thể kinh tế đều có thể tạo ra các đơn vị tiền tệ mới. Mỗi cá nhân tự đánh giá dựa trên lợi ích cá nhân thuần túy xem liệu có đáng để sản xuất một đơn vị tiền tệ mới hay không, dựa trên chi phí sản xuất liên quan. Một chủ thể kinh tế sẽ có động lực sản xuất thêm một đơn vị tiền tệ cho đến thời điểm chi phí sản xuất của một đơn vị bổ sung (chi phí cận biên - marginal costs) tương ứng với giá thị trường hiện tại của đơn vị tiền tệ đó (doanh thu cận biên - marginal revenue); nói cách khác, việc sản xuất sẽ được tiếp tục chừng nào quy trình sản xuất còn mang lại lợi nhuận dương [59, 60, 416].

Tạo tiền cạnh tranh đòi hỏi một hạn chế công nghệ để đưa quy trình tạo tiền vào trạng thái cân bằng. Hình 1.3a trình bày một sơ đồ về mối quan hệ này và trực quan hóa điểm cân bằng, nằm ở giao điểm của đường chi phí cận biên và đường doanh thu cận biên. 

* Độ dốc âm của đường doanh thu cận biên là do tổng cung tiền lớn hơn (với cầu không đổi) dẫn đến việc giảm giá trị thị trường của đơn vị tiền tệ và từ đó giảm doanh thu cận biên [61, 62, 418].
* Độ dốc dương của đường chi phí cận biên là do giả định rằng việc sản xuất một đơn vị tiền tệ đòi hỏi các yếu tố sản xuất, những yếu tố này trở nên khan hiếm hơn và do đó đắt đỏ hơn khi sản xuất tăng lên. Chi phí sản xuất một đơn vị tiếp theo nhờ đó tăng lên cùng với sự mở rộng của cung tiền [62, 63, 418].

Một ví dụ kinh điển về tạo tiền dưới hình thức cạnh tranh là khai thác vàng. Về cơ bản, mọi người đều có thể tham gia vào hoạt động này và đưa vàng mới vào lưu thông. Tuy nhiên, các cá nhân sẽ chỉ tham gia vào hoạt động này chừng nào những nỗ lực của họ còn được đền đáp xứng đáng. Càng có nhiều vàng được phát hiện, quy trình này càng trở nên khó khăn và tốn kém hơn. Đồng thời, sự gia tăng nguồn cung - trong điều kiện các yếu tố khác không đổi - dẫn đến giá vàng giảm, do đó với mỗi đơn vị vàng bổ sung, chi phí sản xuất cận biên tăng lên và doanh thu cận biên giảm đi. Vượt quá một lượng sản xuất cụ thể, chi phí cận biên để sản xuất một đơn vị vàng bổ sung vượt quá giá trị của đơn vị vàng đó, dẫn đến việc việc tạo tiền bị dừng lại [63, 419, 420].

Ngược lại, chi phí cận biên thấp và không đổi (tương tự như Hình 1.3b) dẫn đến việc một lượng lớn đơn vị tiền tệ được sản xuất. Nếu chi phí cận biên nhỏ hoặc thậm chí bằng không, các cá nhân khi đó sẽ có động lực để tạo ra các đơn vị tiền tệ mới cho đến khi giá thị trường của các đơn vị này giảm về không [420, 421].

#### Tạo tiền độc quyền (Monopolized Money Creation)
Chi phí cận biên để sản xuất tiền giấy là rất nhỏ, và vì lý do này, một hạn chế nhân tạo phải được thiết lập bằng cách độc quyền hóa quyền tạo tiền. Thông thường, một tổ chức do nhà nước kiểm soát được trao quyền độc quyền phát hành và quản lý đồng nội tệ. Quyền độc quyền này cũng có thể được tư nhân hóa [25, 422]. Quyền độc quyền tạo tiền cho phép chi phí sản xuất được giữ ở mức thấp hơn giá thị trường [422].

Việc tạo tiền độc quyền được minh họa trong Hình 1.4. Nhà độc quyền phát hành tiền lựa chọn tổng cung, và giá thị trường của đơn vị tiền tệ được xác định bởi tổng cầu. Việc tạo tiền độc quyền cho phép một đơn vị tiền tệ có giá trị thị trường dương ngay cả khi chi phí sản xuất cận biên bằng không [65, 422].

Một ví dụ minh họa về tạo tiền độc quyền là việc sản xuất đồng franc Thụy Sĩ vật lý. Ngân hàng Quốc gia Thụy Sĩ có quyền độc quyền phát hành tiền giấy và nhờ đó sở hữu độc quyền đối với việc tạo ra tiền tệ. Chi phí để sản xuất một tờ tiền giấy trung bình vào khoảng ba mươi xu (gọi là "Rappen") [47, 66, 423]. Đối với tờ tiền mệnh giá một trăm franc Thụy Sĩ, chi phí sản xuất chỉ chiếm 0,3% giá trị thị trường của nó. Dưới sự cạnh tranh hoàn hảo trong sản xuất tiền, thị trường sẽ bị ngập tràn bởi tiền giấy cho đến khi giá trị thực của một tờ tiền bằng với chi phí sản xuất ra nó. Điều này cũng có nghĩa là nhiều nguồn lực hơn sẽ phải bị từ bỏ để sản xuất một tổng giá trị nhất định cho phương tiện trao đổi. Từ quan điểm xã hội, điều này dẫn đến việc phân bổ nguồn lực không hiệu quả và tạo ra lợi thế hiệu quả cho quy trình phát hành tiền độc quyền [66, 67, 423, 424].

> **HỘP 1.4: CHI PHÍ SẢN XUẤT TƯƠNG ĐỐI CỦA CÁC ĐƠN VỊ TIỀN TỆ (Relative Production Costs of Monetary Units)**
> Bảng sau đây cho thấy một ví dụ về chi phí sản xuất đối với đồng franc Thụy Sĩ, liên quan đến thông báo của Hội đồng Liên bang Thụy Sĩ năm 2013 [47, 424]. 
>
> | Mệnh giá (CHF) | Chi phí sản xuất (CHF) | Tỷ lệ phần trăm chi phí / giá trị |
> | :--- | :--- | :--- |
> | 0.05 | 0.0422 | 84.40% |
> | 0.10 | 0.0663 | 66.30% |
> | 0.20 | 0.0847 | 42.35% |
> | 0.50 | 0.0710 | 14.20% |
> | 1.00 | 0.0993 | 9.93% |
> | 2.00 | 0.1940 | 9.70% |
> | 5.00 | 0.3630 | 7.26% |
> | 10.00 | 0.3000 | 3.00% |
> | 20.00 | 0.3000 | 1.50% |
> | 50.00 | 0.3000 | 0.60% |
> | 100.00 | 0.3000 | 0.30% |
> | 200.00 | 0.3000 | 0.15% |
> | 1,000.00 | 0.3000 | 0.03% |
>
> *Lưu ý: Chi phí của tiền giấy là giá trị trung bình trên tất cả các loại tiền giấy. Để so sánh với hoạt động tạo tiền cạnh tranh, chi phí sản xuất của mười nhà sản xuất vàng lớn nhất thế giới ước tính khoảng từ 825 USD đến 1,071 USD cho mỗi ounce vàng, rất gần với giá vàng thị trường (tỷ lệ chi phí sản xuất trên giá trị thị trường là từ 70% đến 95%) [21, 426].*

Bên cạnh các cân nhắc về hiệu quả đã đề cập, có một sự khác biệt quan trọng khác giữa việc tạo tiền cạnh tranh và tạo tiền độc quyền. Dưới hình thức cạnh tranh, cung tiền được xác định bởi chi phí sản xuất và tổng cầu. Ngược lại, một nhà phát hành độc quyền có thể tích cực tác động đến cung tiền và phản hồi lại những thay đổi trong nhu cầu. Vì các hoạt động kinh tế thường có tính chu kỳ, một tổ chức độc quyền phát hành tiền có khả năng ổn định giá trị của tiền bằng cách mở rộng hoặc thu hẹp cung tiền [68, 427].

> **HỘP 1.5: TẠO TIỀN (Money Creation)**
> Các ngân hàng trung ương tạo ra tiền mới bằng cách cấp các khoản vay cho các ngân hàng thương mại hoặc mua ngoại hối và chứng khoán. Khi một ngân hàng trung ương cấp một khoản vay cho một ngân hàng thương mại, khoản vay đó được ghi nhận ở bên tài sản trong bảng cân đối kế toán của nó. Ngược lại, lượng tiền mới tạo ra được ghi nhận ở bên nguồn vốn (nợ phải trả). Quy trình này được gọi là **mở rộng bảng cân đối kế toán (balance sheet extension)**. Vì lượng tiền mới tạo ra có khả năng lưu thông trong nền kinh tế, lượng "tiền" mới đã được tạo ra thông qua việc mở rộng bảng cân đối kế toán này [69, 428, 429].

Việc cung cấp cho ngân hàng trung ương quyền hạn tùy ý điều chỉnh cung tiền để ổn định mức giá có thể mang lại lợi ích lớn cho xã hội. Tuy nhiên, một mức độ tin tưởng cao phải được đặt vào bất kỳ nhà cung cấp tiền tệ độc quyền nào. Nếu tính độc lập của tổ chức không được đảm bảo, quyền độc quyền tạo tiền có thể dẫn đến việc lạm dụng tài trợ cho chi tiêu công thông qua "máy in tiền", điều này thường dẫn đến sự hủy hoại hoàn toàn của đồng tiền tương ứng. Lịch sử tiền tệ đã chứng kiến vô số ví dụ về các trường hợp như vậy (xem Hộp 1.6 và Hộp 1.7) [70, 429, 430].

*Hình 1.5 và 1.6 hiển thị giá trị thực của tiền đối với các loại tiền tệ khác nhau từ năm 1960 đến năm 2018 [70, 430].*
* **Hình 1.5 (Trục logarit, chuẩn hóa về 1 vào tháng 1/1960):** Cho thấy sự mất giá khủng khiếp của các đồng Peso Argentina (ARS), Peso Mexico (MXN) và Lira Thổ Nhĩ Kỳ (TRY). Đồng ARS mất giá trị thực tế đến mức gần như bằng không sau chưa đầy 30 năm [70, 71, 72, 431, 432].
* **Hình 1.6 (Trục logarit, chuẩn hóa về 1 vào tháng 1/1960):** Ngay cả các đồng tiền mạnh như USD, Bảng Anh (GBP), Franc Thụy Sĩ (CHF) và Yên Nhật (JPY) cũng mất giá liên tục. GBP và JPY mất khoảng 90% sức mua từ 1960 đến 2018. CHF là đồng tiền giữ giá tốt nhất nhưng cũng mất khoảng 70% giá trị sức mua [72, 73, 432, 433].

> **HỘP 1.6: CÁC NGÂN HÀNG TRUNG ƯƠNG LÀ NHỮNG HŨ MẬT (Central Banks Are Honey Pots)**
> Tại sao hiệu suất của các loại tiền pháp định do chính phủ phát hành lại mờ nhạt và đôi khi thảm khốc như vậy? Lý do is vì các ngân hàng trung ương là các tổ chức tập trung. Chúng là những **"hũ mật"** (honey pots): tài sản tài chính của một ngân hàng trung ương dễ dàng bị định vị và tịch thu vì lợi ích chính trị hoặc cá nhân. Hơn nữa, ở các quốc gia có thể chế chính trị yếu kém, chính sách tiền tệ thường bị lạm dụng để mang lại lợi ích cho cơ hội tái đắc cử của đảng chính trị cầm quyền [73, 433, 434].
>
> Các tổ chức tập trung không có khả năng kháng kiểm duyệt (censorship resistant) và tạo ra một **điểm lỗi tập trung duy nhất** (single point of failure). Những người tham gia vào các quyết định chính sách tiền tệ đều được biết đến rõ ràng. Họ có thể bị thao túng, gây áp lực và ép buộc. Ngược lại, điểm hấp dẫn chính của Bitcoin là cơ chế quản trị kháng kiểm duyệt của nó. Không có điểm lỗi tập trung nào, và cấu trúc phi tập trung giúp Bitcoin trở nên vô cùng kiên cường [434, 435].

> **HỘP 1.7: SIÊU LẠM PHÁT (Hyperinflation)**
> Một ngưỡng phổ biến phân biệt lạm phát với siêu lạm phát là tỷ lệ lạm phát hàng tháng đạt mức 50%, tương đương với tỷ lệ lạm phát hàng năm ở mức dưới 13,000%. Siêu lạm phát xảy ra thường xuyên nhất khi một quốc gia tài trợ cho thâm hụt ngân sách công trong một thời gian dài bằng cách in tiền [75, 437, 438].
>
> Kể từ Thế chiến thứ hai, 56 trường hợp siêu lạm phát đã được ghi nhận. Tỷ lệ hàng tháng cao nhất dao động từ 50.8% (Đài Loan, 1947) đến 4.19 $\times 10^{16}\%$ (tức 41.9 triệu tỷ phần trăm tại Hungary, 1945–1946). Gần đây hơn, cuộc siêu lạm phát của Zimbabwe (2007–2008) đã gây chấn động khi sức mua của đồng đô la Zimbabwe giảm 50% chỉ trong vòng hơn 24 giờ [438].
>
> Những giá trị cực đoan này là khả thi vì các tổ chức tương ứng có thể thay đổi mệnh giá của tờ tiền giấy của họ. Nếu chi phí cận biên của việc sản xuất tiền giấy vượt quá giá trị hiện tại của tờ tiền, tổ chức tạo tiền có thể điều chỉnh mệnh giá danh nghĩa của tờ tiền và do đó làm giảm chi phí sản xuất tương đối trên mỗi đơn vị tiền tệ. Điều này dẫn đến những tờ tiền ngớ ngẩn như tờ tiền mệnh giá 100 nghìn tỷ mark được phát hành vào năm 1924 tại Đức [76, 439].

Trật tự tiền tệ ngày nay không thể được mô tả bằng một quy trình tạo tiền độc quyền hoàn toàn. Các ngân hàng thương mại tạo ra các khoản tiền gửi ngân hàng (bank deposits), mặc dù không phải là phương tiện thanh toán hợp pháp pháp định, nhưng trong hầu hết các trường hợp được coi là tương đương với phương tiện thanh toán hợp pháp và được lưu thông theo cách tương tự. 

Tiền gửi ngân hàng không có gì khác ngoài lời hứa của ngân hàng thương mại tương ứng sẽ hoàn trả phương tiện thanh toán hợp pháp theo yêu cầu. Ví dụ, nếu một người có tờ tiền giấy mệnh giá 100 USD, họ đang sở hữu phương tiện thanh toán hợp pháp. Tuy nhiên, nếu cùng một người đó có một tài khoản tiền gửi tại một ngân hàng thương mại với số dư 100 USD, số dư đó là một cam kết thanh toán - nói cách khác, là tiền tín dụng như đã mô tả trong Mục 1.4.2 [76, 77, 439, 440].

Các ngân hàng thương mại tạo ra tiền theo cách tương tự như các ngân hàng trung ương (xem Hộp 1.5). Các ngân hàng thương mại tạo ra tiền (tức là tiền gửi không kỳ hạn - demand deposits) khi họ phát hành các khoản vay cho các cá nhân và công ty tư nhân. Khi các ngân hàng thương mại phát hành các khoản vay cho khách hàng của họ, họ tăng tiền gửi không kỳ hạn của khách hàng và ghi nhận các khoản vay đó là tài sản của ngân hàng. Về mặt kỹ thuật, một ngân hàng thương mại có thể tạo ra bất kỳ lượng tiền nào bằng cách cấp các khoản vay. Trong thực tế, tính sinh lời của hoạt động kinh doanh này và các quy định tối thiểu về dự trữ bắt buộc giới hạn việc tạo tiền của ngân hàng thương mại để tránh rủi ro mất thanh khoản [78, 441, 442].

> **HỘP 1.8: HỆ THỐNG NGÂN HÀNG DỰ TRỮ MỘT PHẦN (Fractional Reserve Banking)**
> Trong hệ thống tiền tệ hiện tại, các ngân hàng thương mại tạo ra nhiều tiền hơn số tiền họ nắm giữ dưới dạng dự trữ tại ngân hàng trung ương. Vì lý do này, hệ thống được gọi là **hệ thống ngân hàng dự trữ một phần** (fractional reserve banking). Điều này được một số nhóm nhìn nhận như một thiếu sót của trật tự tiền tệ hiện tại. Đặc biệt, có những yêu cầu rằng các ngân hàng thương mại phải nắm giữ 100% dự trữ hoặc tiền gửi của khách hàng phải được giữ dưới dạng các tài khoản ngoại bảng [79, 443].
>
> Mặc dù có những rủi ro liên quan đến ngân hàng dự trữ một phần, tầm quan trọng của tiền gửi không kỳ hạn đối với thanh toán không nên bị đánh giá thấp [444]. Ở many quốc gia, tiền gửi không kỳ hạn là lựa chọn duy nhất mà các cá nhân có để nắm giữ và chuyển giao tiền dưới dạng ảo [80, 444].

### 1.5.2 Đại diện (Representation)
Có hai cách để tiền có thể được đại diện - các đơn vị tiền tệ có thể có **đại diện vật lý (physical representation)** hoặc **đại diện ảo (virtual representation)** [80, 445].

#### Đại diện vật lý (Physical representation)
Các đơn vị tiền tệ vật lý được liên kết với một vật thể. Việc kiểm soát vật lý đối với vật thể cũng đồng nghĩa với việc sở hữu giá trị tương ứng. Ví dụ, nếu ai đó kiểm soát một đồng xu vàng vật lý, thì về cơ bản người đó có quyền sử dụng nó [81, 446].

Các đơn vị tiền tệ vật lý đặc biệt hấp dẫn vì việc xử lý đơn giản của chúng. Vì người nắm giữ một đơn vị tiền tệ vật lý tự động là chủ sở hữu của giá trị tương ứng, quyền sở hữu đối với các đơn vị tự do lưu thông trong nền kinh tế luôn được xác định rõ ràng mà không ai phải ghi chép sổ sách. Tính năng này cho phép tạo ra một hệ thống thanh toán phi tập trung nơi các đơn vị tiền tệ vật lý có thể đổi chủ giữa các tác nhân mà không cần sự tham gia của bên thứ ba. Do đó, các đơn vị tiền tệ vật lý cho phép các tác nhân duy trì sự ẩn danh (xem Hộp 1.12) và bảo vệ chủ sở hữu chống lại các phụ thuộc hệ thống [81, 82, 447, 448].

Các đơn vị tiền tệ vật lý có một số nhược điểm như sau [82, 448]:
* **Bị hạn chế ở một địa điểm địa lý:** Các đơn vị tiền tệ vật lý bị giới hạn trong các giao dịch mà các bên phải gặp mặt trực tiếp để thực hiện trao đổi [448].
* **Lưu giữ và vận chuyển:** Tiền dưới dạng vật lý phát sinh chi phí lưu giữ và vận chuyển. Các đơn vị tiền tệ phải được lưu trữ chuyên nghiệp, bảo vệ và thường xuyên được bảo hiểm [448, 449].
* **Toàn vẹn vật lý (Chống làm giả):** Đơn vị tiền tệ phải có khả năng chống làm giả cao bằng cách đặt các tính năng bảo mật trên chúng [449, 450].
* **Mệnh giá và tính chia nhỏ:** Các đơn vị tiền tệ vật lý không thể chia nhỏ hoàn toàn. Việc chia nhỏ một đơn vị tiền tệ vật lý có thể rất tốn kém (kim loại quý) hoặc không thể thực hiện được (tiền giấy) [84, 450].

#### Đại diện ảo (Virtual representation)
Tiền ảo là một sự thay thế cho tiền dưới dạng vật lý. Các đơn vị tiền tệ ảo bao gồm tất cả các loại đơn vị tiền tệ **không có** đại diện vật lý. Chính xác hơn, một đơn vị tiền tệ là ảo nếu nó có thể được chuyển giao cho một chủ sở hữu mới mà việc chuyển giao không liên quan đến sự thay đổi trong việc kiểm soát một vật thể vật lý [85, 451].

> **HỘP 1.9: ĐỊNH NGHĨA VỀ CÁC ĐƠN VỊ TIỀN TỆ ẢO (Definition of Virtual Monetary Units)**
> Tại thời điểm này, cần đề cập rằng Ngân hàng Trung ương Châu Âu (ECB) đã công bố một định nghĩa về đơn vị tiền tệ ảo mâu thuẫn với định nghĩa của chúng tôi. ECB giữ quan điểm rằng tiền ảo nghiêm ngặt phải mang tính chất kỹ thuật số. (Trích từ Báo cáo của ECB [90] về chủ đề "Tiền ảo": *"Một loại tiền ảo là một loại tiền kỹ thuật số không được quản lý, được phát hành và thường được kiểm soát bởi các nhà phát triển của nó, và được sử dụng và chấp nhận giữa các thành viên của một cộng đồng ảo cụ thể"*).
>
> Mặc dù các từ *ảo* (virtual) và *kỹ thuật số* (digital) trong hầu hết các trường hợp được sử dụng thay thế cho nhau, việc sử dụng chúng như các từ đồng nghĩa nên được tránh. Tính từ "ảo" là từ trái nghĩa của "vật lý" và không bắt nguồn từ bất kỳ mối liên hệ nào với "kỹ thuật số". Hơn nữa, yêu cầu của ECB rằng từ "không được quản lý" là một đặc điểm của định nghĩa đã loại trừ một số công cụ thay thế đơn vị tiền tệ vốn dĩ rõ ràng thuộc về phạm vi của các đơn vị tiền tệ ảo (ví dụ: tiền gửi không kỳ hạn trong hệ thống tài chính truyền thống rõ ràng được quản lý nhưng vẫn hoàn toàn mang tính chất ảo) [85, 451, 452, 453].

Tiền ảo chia sẻ nhiều thuộc tính của tiền vật lý mà không có các nhược điểm của đại diện vật lý, nhưng cũng có những mặt trái. Trong khi quyền sở hữu của một đối tượng vật lý được thiết lập rõ ràng bởi vị trí của đối tượng đó, quyền sở hữu của một yêu cầu ảo có thể bị tranh chấp. Để giải quyết vấn đề này, việc hợp pháp hóa và chứng minh các yêu cầu ảo diễn ra thông qua các **sổ cái ẩn (implicit ledgers) hoặc sổ cái tường minh (explicit ledgers)** nhằm lưu lại hồ sơ về lượng nắm giữ của tất cả các chủ thể kinh tế [86, 454].

> **HỘP 1.10: TỜ TIỀN GIẤY KỸ THUẬT SỐ (A Digital Banknote)**
> Một nỗ lực ngây thơ để đại diện cho giá trị một cách ảo là sử dụng các tệp dữ liệu "tiền mặt". Loại tệp dữ liệu này có thể được sử dụng như một tờ tiền giấy kỹ thuật số và lưu thông tự do theo cách tương tự như tiền giấy vật lý. Miễn là quyền sở hữu tệp dữ liệu có thể được chứng minh rõ ràng, không cần sổ cái nào cả.
>
> Tuy nhiên, ý tưởng này có một vấn đề lớn. Khác với các đối tượng vật lý, các đối tượng ảo có thể dễ dàng bị sao chép. Do đó, các tệp dữ liệu "tiền mặt" như vậy thiếu đi đặc tính cơ bản quan trọng nhất của tiền, đó là **tính khan hiếm**, và không thể tự thiết lập làm tiền [454, 455].

Sổ cái ẩn (implicit ledgers) chỉ dựa trên thỏa thuận miệng của những người tham gia sử dụng chúng và do đó bị giới hạn trong các cộng đồng nhỏ, có mạng lưới liên kết tốt. Hộp 1.11 giải quyết một ví dụ về đơn vị tiền tệ ảo dựa trên sổ cái ẩn [87, 456]. Các nhóm xã hội lớn hơn tạo ra các hệ thống phức tạp và các mối quan hệ sở hữu phức tạp khiến việc sử dụng sổ cái tường minh (explicit ledgers) trở thành bắt buộc. Đối với những trường hợp như vậy, các cơ sở dữ liệu được sử dụng để lưu trữ các bản ghi dưới dạng văn bản hoặc kỹ thuật số [87, 456].

> **HỘP 1.11: VỀ NHỮNG CHIẾC BÁNH XE ĐÁ ẢO (On Virtual Millstones)**
> Một ví dụ ấn tượng và rất sinh động về tiền ảo (nhưng không phải kỹ thuật số) dựa trên một sổ cái ẩn được cung cấp bởi nhà nhân chủng học người Mỹ William Henry Furness III. Vào đầu thế kỷ XX, ông đã dành vài tháng trên hòn đảo Yap thuộc Micronesia thuộc Đức để nghiên cứu lối sống và văn hóa của người dân bản địa đảo Yap. Ông đặc biệt ấn tượng bởi hệ thống tiền tệ của cư dân trên đảo.
>
> Trong báo cáo của mình [101], ông viết về những khối đá lớn có hình dạng giống như bánh xe cối xay được khai thác từ đảo Palau cách đó 280 dặm, và sau đó được chở bằng bè đến Yap. Khi đến nơi, những viên đá này được sử dụng làm **tiền**.
>
> Nhưng thay vì tốn công di chuyển những viên đá - mỗi viên có đường kính lên tới 13 feet - đến thuộc tính của chủ sở hữu mới sau mỗi giao dịch, cư dân đảo đồng ý để nguyên các vật thể cồng kềnh đó tại vị trí ban đầu của chúng. Yếu tố quyết định duy nhất là cộng đồng công nhận sự thay đổi quyền sở hữu. Thông tin về các giao dịch đã diễn ra và những thay đổi về quyền sở hữu tương ứng sẽ được truyền đạt giữa các cư dân trên đảo cho đến khi tất cả mọi người đều được thông báo.
>
> Mặc dù các bánh xe cối xay đá là những vật thể vật lý, yêu cầu đối với quyền sở hữu của chúng đã được tách rời khỏi chúng và được giao dịch một cách độc lập. Sự tách rời này dẫn đến hậu quả là việc kiểm soát vật lý đối với viên đá không còn đồng nghĩa với việc sở hữu giá trị của vật thể vật lý đó nữa. 
>
> Theo các báo cáo của Furness, quy trình ảo hóa đã tiến triển rất xa, đến mức ngay cả giá trị đơn vị của một viên đá bị chìm dưới biển khi được vận chuyển từ Palau đến Yap vẫn được chấp nhận làm phương tiện trao đổi, ngay cả khi chính viên đá đó đã nằm dưới đáy đại dương qua nhiều thế hệ [100]. Các viên đá vật lý chỉ có tầm quan trọng thứ yếu và không liên quan đến việc thiết lập quyền sở hữu thực tế - sự tách biệt này chính là đặc điểm giúp đơn vị tiền tệ thỏa mãn định nghĩa của chúng tôi về tính chất ảo [88, 89, 457, 458, 459, 460].

Hệ thống tài chính ngày nay dựa trên một kiến trúc nhiều tầng của các sổ cái tường minh. Các ngân hàng trung ương giữ sổ cái ghi chép tài sản của các ngân hàng thương mại. Các ngân hàng thương mại lần lượt giữ sổ cái ghi chép tài sản của khách hàng của họ. Như chúng ta sẽ thấy trong các chương tiếp theo, Bitcoin cũng được quản lý trên cơ sở một sổ cái tường minh, cụ thể là **blockchain Bitcoin** [90, 461].

> **HỘP 1.12: ĐƠN VỊ TIỀN TỆ VÀ TÍNH ẨN DANH (Monetary Units and Anonymity)**
> Giao dịch với các đơn vị tiền tệ vật lý mang lại mức độ ẩn danh rất cao. Thông thường, không có dữ liệu nào cho biết các đơn vị tiền tệ vật lý thực sự nằm ở đâu. Ngược lại, các hệ thống với đơn vị tiền tệ ảo minh bạch hơn nhiều. Sự tồn tại của sổ cái đồng nghĩa với việc ít nhất một bên luôn được thông báo về sự phân bổ hiện tại của tất cả các đơn vị tiền tệ cũng như về tất cả các giao dịch, từ đó làm giảm tính ẩn danh. 
>
> Điều này làm dấy lên những lo ngại nhất định về quyền riêng tư. Bitcoin giải quyết vấn đề này bằng cách sử dụng các bí danh một chiều (one-way pseudonyms) sao cho mặc dù các bí danh được ghi lại trong sổ cái Bitcoin, chúng chỉ có thể được liên kết với một cá nhân dưới những trường hợp cụ thể [90, 461, 462, 463, 464].

### 1.5.3 Xử lý giao dịch (Transaction Processing)
Xử lý giao dịch có thể là **tập trung (centralized)** hoặc **phi tập trung (decentralized)**. 
* **Xử lý giao dịch phi tập trung:** Có nghĩa là người nắm giữ đơn vị tiền tệ có thể chuyển giao quyền sở hữu của nó một cách độc lập mà không có bất kỳ nghĩa vụ nào phải nhờ đến sự hỗ trợ của bên thứ ba.
* **Xử lý giao dịch tập trung:** Ngược lại, với xử lý tập trung, một cơ quan trung ương chịu trách nhiệm xử lý các giao dịch, và sự đồng ý của tổ chức này là bắt buộc để đơn vị tiền tệ được chuyển giao [464, 465].

Bất kể việc xử lý giao dịch là tập trung hay phi tập trung, ba yêu cầu giao dịch sau đây phải được đáp ứng [465]:
* **Khả năng giao dịch (Transactional capacity):** Yêu cầu này đảm bảo rằng các giao dịch có thể được khởi tạo và các đơn vị giá trị được chuyển giao.
* **Tính hợp lệ của giao dịch (Transactional legitimacy):** Yêu cầu này đảm bảo rằng có một cơ chế kiểm soát để đảm bảo rằng các giao dịch chỉ có thể được khởi tạo bởi (những) chủ sở hữu hợp pháp [466].
* **Sự đồng nhất giao dịch (Transactional consensus):** Yêu cầu này đảm bảo rằng có một quy trình thiết lập một sự phân bổ quyền sở hữu rõ ràng và không mơ hồ đối với tất cả các đơn vị tiền tệ tại mọi thời điểm [466].

Các đơn vị tiền tệ vật lý, theo định nghĩa, được xử lý theo cách phi tập trung. Cả ba yêu cầu tự động được đáp ứng do tính chất vật lý của vật thể. Việc loại bỏ đại diện vật lý phá vỡ sự đồng thuận giao dịch vốn có và dẫn đến nhu cầu sử dụng sổ cái (xem Mục 1.5.2). Khi sổ cái được sử dụng, câu hỏi ai là người quản lý chúng phải được giải quyết [467].

Sẽ gây ra những vấn đề lớn nếu mọi người tham gia đều có quyền quản lý sổ cái. Một quyền chung được điều sổ cái sẽ là một lựa chọn khả thi cho các nhóm nhỏ, nhưng ngay khi hệ thống đạt đến một quy mô nhất định, việc sử dụng một sổ cái ẩn chung chắc chắn sẽ gây ra các tranh chấp về trạng thái thực sự của sổ cái. Hơn nữa, những kẻ xấu có thể gieo rắc các báo cáo sai lệch bằng cách truyền đạt các giao dịch đã bị thao túng. Trong khoa học máy tính, những vấn đề này được gọi là **Bài toán các vị tướng Byzantine (Byzantine Generals’ Problem)** [93, 468, 469].

> **HỘP 1.13: BÀI TOÁN CÁC VỊ TƯỚNG BYZANTINE (The Byzantine Generals’ Problem)**
> Bài toán các vị tướng Byzantine mô tả một thách thức cơ bản đối với các hệ thống thông tin phi tập trung. Các bộ phận bị hỏng hoặc bị suy thoái trong hệ thống có thể phổ biến thông tin sai lệch và do đó gây ra những mâu thuẫn. Vì vậy, điều cần thiết là hệ thống phải có một mức độ chịu lỗi nhất định và có thể đạt được một thỏa thuận chung bằng cách áp dụng một thuật toán cụ thể.
>
> Trong bài báo khoa học đầu tiên giới thiệu chủ đề này [136], vấn đề được minh họa trong bối cảnh một câu chuyện mô tả. Nhiều sư đoàn của quân đội Byzantine đang bao vây một thành phố của kẻ thù. Các sư đoàn chỉ có thể liên lạc với nhau bằng cách sử dụng sứ giả và phải đồng ý về một chiến lược chung—chẳng hạn như tiếp tục bao vây hoặc tấn công. Chỉ khi các sư đoàn trung thành chọn cùng một chiến lược thì kế hoạch mới thành công và quân đội Byzantine mới chiến thắng [94, 469].

Hệ thống xử lý giao dịch tập trung của các ngân hàng thương mại được dùng để đơn giản hóa quy trình giao dịch và đạt được sự đồng thuận. Đồng thời, việc thiết lập một nhà độc quyền như vậy lại dễ bị tổn hại trước rủi ro lạm dụng quyền lực. Về mặt lý thuyết, một cơ quan trung ương có thể tùy ý thay đổi sổ cái hoặc từ chối xử lý các giao dịch vốn dĩ hoàn toàn hợp lệ. Ngay cả ở các quốc gia không lo ngại về sự lạm dụng trắng trợn này, một số câu hỏi vẫn cần được đặt ra: 

* Nền kinh tế nên và có thể phụ thuộc vào các cơ sở hạ tầng trung ương đến mức độ nào?
* Ai quyết định việc phân bổ đặc quyền ghi chép sổ sách, và làm thế nào để ngăn chặn một thực thể trung ương bị tha hóa hoặc trục lợi độc quyền?
* Thêm vào đó, một cơ sở hạ tầng tập trung làm tăng rủi ro của các cuộc tấn công tội phạm và tịch thu tiền bởi các bên thứ ba (hacker, sự ép buộc của chế độ độc tài, tịch thu tùy tiện) [472, 473].

Đặc biệt, một câu hỏi triết học cấp bách cần được giải quyết là **liệu thuật ngữ "tài sản" (property) có còn bất kỳ ý nghĩa nào hay không nếu đơn vị giá trị tương ứng chỉ có thể được chuyển nhượng và sử dụng với sự đồng ý của một thực thể khác** [473].

Chúng ta đang đối mặt với một thế tiến thoái lưỡng nan. Một mặt, từ góc độ hiệu quả, một đơn vị tiền tệ ảo là tối ưu. Mặt khác, đại diện ảo lại đòi hỏi quy trình xử lý giao dịch tập trung với tất cả các nhược điểm đã được mô tả ở trên. Do đó, việc thiết kế một đơn vị tiền tệ ảo có tính năng xử lý giao dịch phi tập trung là điều vô cùng mong muốn. **Vào năm 2008, các nhà phát triển Bitcoin đã đề xuất một đơn vị tiền tệ ảo không phụ thuộc vào các tổ chức tập trung** [473, 474].

---

## 1.6 BÀI TẬP CHƯƠNG 1 (Exercises)
* **Bài tập 1.1:** Hãy giải thích ba chức năng của một đơn vị tiền tệ. Đối với mỗi chức năng này, hãy nêu ít nhất một thuộc tính tiền tệ cơ bản có liên quan đến chức năng đó. Nêu lý do cho sự lựa chọn của bạn [98, 474].
* **Bài tập 1.2:** Trong một nền kinh tế mô hình đơn giản hóa, 26 sản phẩm khác nhau được giao dịch trực tiếp với nhau. Sử dụng một ví dụ định lượng và lập luận để chỉ ra tác động của việc giới thiệu một phương tiện trao đổi được chấp nhận rộng rãi (hoặc đơn vị tiền tệ) đối với số lượng các cặp sản phẩm có thể trao đổi [99, 475].
* **Bài tập 1.3:** Với cùng chi phí cận biên, hãy giải thích tại sao tổng chi phí sản xuất một lượng tiền thực tế nhất định dưới hình thức tạo tiền cạnh tranh sẽ không bao giờ nhỏ hơn tổng chi phí dưới hình thức tạo tiền độc quyền [99, 475].
* **Bài tập 1.4:** Hãy tính toán lượng tiền cân bằng $q$ nếu giá trị của một đơn vị tiền tệ được tạo ra dưới hình thức cạnh tranh được xác định bởi hàm cầu ngược $MR(q) = \max[50 - 2q, 0]$ và nếu chi phí cận biên để sản xuất một đơn vị tiền tệ có dạng như sau [476]:
  a) $MC(q) = 3q$  
  b) $MC(q) = 10$
* **Bài tập 1.5:** Hãy minh họa lời giải từ bài tập 1.4 trong một đồ thị so sánh với Hình 1.3 [476].
* **Bài tập 1.6:** Đọc bài viết trên Wikipedia về M-Pesa [225] và đánh giá đơn vị tiền tệ này đối với các cấu trúc kiểm soát của nó [476].
* **Bài tập 1.7:** Mô tả mức độ mà Bài toán các vị tướng Byzantine có thể cản trở quy trình xử lý giao dịch phi tập trung của các đơn vị tiền tệ ảo [477].
