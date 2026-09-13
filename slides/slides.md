---
theme: default
title: 'Bitcoin, Blockchain & Cryptoassets'
info: 'Bản trình chiếu giáo trình Schär & Berentsen: Bitcoin, Blockchain, and Cryptoassets — A Comprehensive Introduction (bản tiếng Việt 8 chương).'
author: ĐH Đà Lạt, Khoa CNTT
lang: vi
aspectRatio: 16/9
colorSchema: light
highlighter: shiki
lineNumbers: true
transition: slide-left
mdc: true
layout: cover-custom
fonts:
  sans: Inter
  mono: Fira Code
  provider: google
unoCSS:
  presets:
    - icons
  icons:
    collections:
      mdi: true
      twemoji: true
drawings:
  enabled: false
defaults:
  transition: fade
---

<CoverSlide
  badge="Giới thiệu sách"
  advisor="Fabian Schär · Aleksander Berentsen"
  :student="['2312702 - Nguyễn Bá Thiều Khôi Nguyên', '2312675 - Hồ Quốc Long']"
>
  <template #title>
    Bitcoin, <br />
    <span class="gradient-text">Blockchain,<br /></span>
    <span class="gradient-text-accent">and Cryptoassets</span>
  </template>
</CoverSlide>

---
layout: content-card
---

<div class="deck-kicker">Giới thiệu</div>

# Hành trình khám phá Bitcoin và Blockchain

<div class="split-board">
  <div class="focus-panel accent-blue">
    <div>
      <span class="badge badge-network">Lời tựa · Preface</span>
      <h2>Bitcoin — từ tiền tệ đến hệ thống Blockchain</h2>
      <p><strong>Cuốn sách</strong> <em>Bitcoin, Blockchain, and Cryptoassets</em> trình bày Bitcoin theo một lộ trình từ <strong>bản chất của tiền tệ</strong>, đến <strong>cơ chế kỹ thuật bên trong</strong>, và cuối cùng là <strong>những thách thức và ứng dụng của Blockchain</strong>.</p>
    </div>
    <div class="metric-row">
      <MetricCard icon="i-twemoji-books" value="8" label="Chương" variant="primary" />
      <MetricCard icon="i-mdi-book-multiple" value="3" label="Phần" variant="accent" />
    </div>
  </div>

  <div class="module-list">
    <div class="module-card accent-blue"><div class="icon-bubble"><span class="i-mdi-book-open-variant"></span></div><div><h3>PHẦN I · INTRODUCTION <code>C1–C2</code></h3><p>Nền tảng về tiền tệ và tổng quan Bitcoin.</p></div></div>
    <div class="module-card accent-amber"><div class="icon-bubble"><span class="i-mdi-cogs"></span></div><div><h3>PHẦN II · TECHNICAL ANALYSIS <code>C3–C5</code></h3><p>Phân tích mạng lưới, tính hợp lệ của giao dịch và cơ chế đồng thuận.</p></div></div>
    <div class="module-card accent-green"><div class="icon-bubble"><span class="i-mdi-lightbulb"></span></div><div><h3>PHẦN III · FURTHER REMARKS <code>C6–C8</code></h3><p>Thách thức, ứng dụng mở rộng và hướng dẫn thực tiễn.</p></div></div>
  </div>
</div>

---
layout: content-card
---

<div class="deck-kicker">Lộ trình 8 chương · 1/3</div>

# MỤC LỤC — PART I · INTRODUCTION

<div class="agenda-rail">
  <div class="agenda-hero">
    <div>
      <span class="badge badge-network">Phần I · C1–C2</span>
      <h2>Tiền là trí nhớ — và Bitcoin số hóa nó</h2>
    </div>
    <div class="metric-row">
      <MetricCard icon="i-twemoji-open-book" value="02" label="Chương · Phần I" variant="primary" />
    </div>
  </div>

  <div class="agenda-list">
    <div class="agenda-item accent-blue">
      <div class="agenda-number">01</div>
      <div><div class="agenda-title">Bối cảnh lý thuyết tiền tệ</div><div class="agenda-desc">Tiền là "trí nhớ" · nguồn gốc · chức năng · ai được tạo tiền</div></div>
    </div>
    <div class="agenda-item accent-cyan">
      <div class="agenda-number">02</div>
      <div><div class="agenda-title">Tổng quan Bitcoin</div><div class="agenda-desc">Tiền mặt điện tử P2P · 5 thành phần · lịch sử · fork</div></div>
    </div>
  </div>
</div>

---
layout: content-card
---

<div class="deck-kicker">Lộ trình 8 chương · 2/3</div>

# MỤC LỤC — PART II · TECHNICAL ANALYSIS

<div class="agenda-rail">
  <div class="agenda-hero">
    <div>
      <span class="badge badge-warning">Phần II · C3–C5</span>
      <h2>Trái tim kỹ thuật của hệ thống</h2>
    </div>
    <div class="metric-row">
      <MetricCard icon="i-twemoji-open-book" value="03" label="Chương · Phần II" variant="warning" />
      <MetricCard icon="i-mdi-cogs" value="PoW" label="Đồng thuận" variant="accent" />
    </div>
  </div>

  <div class="agenda-list">
    <div class="agenda-item accent-green">
      <div class="agenda-number">03</div>
      <div><div class="agenda-title">Xử lý giao dịch</div><div class="agenda-desc">Mạng P2P · nút mạng · SPV · mempool · selfish mining</div></div>
    </div>
    <div class="agenda-item accent-amber">
      <div class="agenda-number">04</div>
      <div><div class="agenda-title">Tính hợp lệ giao dịch</div><div class="agenda-desc">Địa chỉ · ví HD · elliptic · UTXO · Script · SegWit</div></div>
    </div>
    <div class="agenda-item accent-blue">
      <div class="agenda-number">05</div>
      <div><div class="agenda-title">Đồng thuận giao dịch</div><div class="agenda-desc">Merkle · Proof of Work · halving · kinh tế đào · tấn công</div></div>
    </div>
  </div>
</div>

---
layout: content-card
---

<div class="deck-kicker">Lộ trình 8 chương · 3/3</div>

# MỤC LỤC — PART III · FURTHER REMARKS

<div class="agenda-rail">
  <div class="agenda-hero">
    <div>
      <span class="badge badge-success">Phần III · C6–C8</span>
      <h2>Nhìn lại thách thức, hướng tới ứng dụng</h2>
    </div>
    <div class="metric-row">
      <MetricCard icon="i-twemoji-open-book" value="03" label="Chương · Phần III" variant="success" />
    </div>
  </div>

  <div class="agenda-list">
    <div class="agenda-item accent-red">
      <div class="agenda-number">06</div>
      <div><div class="agenda-title">Thách thức của Bitcoin</div><div class="agenda-desc">Giá cả · stablecoin · CBDC · Lightning · năng lượng</div></div>
    </div>
    <div class="agenda-item accent-violet">
      <div class="agenda-number">07</div>
      <div><div class="agenda-title">Ứng dụng khác</div><div class="agenda-desc">Chứng thực · token hóa · hợp đồng · oracle</div></div>
    </div>
    <div class="agenda-item accent-green">
      <div class="agenda-number">08</div>
      <div><div class="agenda-title">Thực hành Bitcoin</div><div class="agenda-desc">Mua · lưu trữ · chấp nhận thanh toán</div></div>
    </div>
  </div>
</div>

---
layout: chapter
partNumber: III
---

# Part III

## FURTHER REMARKS

Thách thức, các ứng dụng mở rộng và cách thực hành với Bitcoin.

---
layout: chapter
chapterNumber: 6
eyebrow: Phần III · Further Remarks
---

# Chương 6

## CÁC THÁCH THỨC CỦA BITCOIN

Từ biến động giá cả và CBDC đến mở rộng quy mô và chi phí năng lượng.

---
layout: content-card
---

<div class="deck-kicker">Thách thức Biến động Giá & Stablecoins</div>

# Vì sao giá Bitcoin biến động mạnh?

> **Cung Bitcoin được cố định bằng thuật toán**, không thể co giãn theo biến động của tổng cầu → thay đổi nhu cầu chủ yếu phản ánh vào **giá**.



- **Cầu tăng/giảm mạnh** → giá biến động cực đoan, khiến Bitcoin khó đóng vai trò **phương tiện thanh toán ổn định**.
- Giải pháp: Stablecoin ra đời nhằm duy trì giá trị ổn định, thường **neo theo USD**.

<br />

# Ba kiểu stablecoin

<div class="card-grid-3">
  <div class="feature-card signal-card accent-blue"><div class="icon-bubble"><span class="i-mdi-bank"></span></div><div><h3>Fiat-backed<br />Thế chấp ngoại chuỗi</h3><p>USDT và USDC được bảo chứng bằng USD trong ngân hàng, nhưng mô hình này tiềm ẩn rủi ro <strong>tập trung và kiểm toán</strong>.</p></div></div>
  <div class="feature-card signal-card accent-green"><div class="icon-bubble"><span class="i-mdi-link-variant"></span></div><div><h3>Crypto-backed<br />Thế chấp nội chuỗi</h3><p>DAI thế chấp quá mức bằng một loại crypto khác và có nguy cơ bị <strong>thanh lý tự động</strong> khi thị trường sập.</p></div></div>
  <div class="feature-card signal-card accent-red"><div class="icon-bubble"><span class="i-mdi-flask"></span></div><div><h3>Algorithmic<br />Thuật toán</h3><p>Cơ chế tự đúc và đốt token bổ trợ kém ổn định, dễ rơi vào <strong>vòng xoáy tử thần</strong></p></div></div>
</div>

---
layout: two-cols-custom
---

::header::

<div class="deck-kicker">Tiền kỹ thuật số Ngân hàng Trung ương (CBDC)</div>

::default::

## <span class="i-mdi-bank"></span> Động lực chính phủ



- Giành lại kiểm soát **chính sách tiền tệ** trước tài sản mã hóa tư nhân.
- Giữ khả năng giám sát KYC/AML toàn hệ thống.



::right::

## <span class="i-mdi-book-open-variant"></span> Token hay sổ cái tập trung?



- **CBCC/Fedcoin (token công khai):** dân tự quản — **ít khả thi** vì mất kiểm soát danh tính.
- **Sổ cái tập trung:** tài khoản trực tiếp tại NHTW hoặc qua NHTM — **phổ biến**, giám sát tối đa nhưng **triệt tiêu riêng tư**.



---
layout: content-card
---

<div class="deck-kicker">C6 · Slide 3 — Mở rộng</div>

# Mạng Lightning (Layer 2)

<div class="split-board">
  <div class="focus-panel accent-cyan">
    <div>
      <span class="badge badge-accent">Off-chain</span>
      <h2>Khóa một lần — giao dịch vô hạn</h2>
    </div>
    <div>
      <p><strong>Giới hạn của tầng L1</strong> chỉ đạt khoảng <strong>3–7 TPS</strong> (khối 1MB, 10 phút), quá nhỏ bé so với hàng chục nghìn TPS của Visa.</p>
      <p><strong>Cơ chế Lightning</strong> khóa BTC vào một <strong>ví multisig chung</strong> rồi thực hiện giao dịch <strong>off-chain</strong> gần như tức thời với phí không đáng kể; chỉ số dư cuối cùng mới được ghi lên chuỗi khi <strong>đóng kênh</strong>.</p>
      <p>Để <strong>chống gian lận</strong>, bên nào đưa trạng thái cũ lên chuỗi sẽ <strong>mất toàn bộ số tiền</strong> trong kênh.</p>
    </div>
  </div>

  <figure class="report-figure">
    <img src="/media-lightning.svg" alt="Mạng Lightning" />
    <figcaption>Khóa một lần trên L1, giao dịch vô hạn off-chain.</figcaption>
  </figure>
</div>

<p class="formula-source">Theo Chương 6 · Schär & Berentsen</p>

---
layout: content-card
---

<div class="deck-kicker">C6 · Slide 4 — Năng lượng & chính trị</div>

# Cái giá của Proof of Work

<div class="callout-band accent-amber">
  <div class="statement-number">≈</div>
  <div><h3>Tổng chi phí điện năng ≈ tổng doanh thu đào</h3><p>Doanh thu đào đến từ thưởng khối và phí giao dịch; cạnh tranh hoàn hảo khiến tiêu thụ điện tăng tỷ lệ thuận với giá BTC.</p></div>
</div>



- Cạnh tranh hoàn hảo → điện tiêu thụ **tỷ lệ thuận giá BTC**, ngang nhiều quốc gia.
- **Cá voi (Whales):** ít địa chỉ nắm phần lớn cung → dễ thao túng giá.
- **Pháp lý:** cấm giao dịch / cấm đào / thuế nặng để hạn chế ảnh hưởng.



<p class="formula-source">Theo Chương 6 · Schär & Berentsen</p>

---
layout: chapter
chapterNumber: 7
eyebrow: Phần III · Further Remarks
---

# Chương 7

## CÁC ỨNG DỤNG KHÁC

Từ chứng thực và token hóa đến hợp đồng thông minh và oracle.

---
layout: content-card
---

<div class="deck-kicker">C7 · Slide 1 — Chứng thực</div>

# Con dấu thời gian toàn cầu

<p class="deck-lead">Chuỗi khối vận hành như một cỗ máy đóng dấu thời gian bất biến mà không cần bất kỳ bên thứ ba nào.</p>

<div class="process-track">
  <div class="process-step accent-blue"><div class="step-number">01</div><h3>Tồn tại</h3><p>Người dùng băm tài liệu rồi lưu hash qua <code>OP_RETURN</code>; bất kỳ ai cũng có thể kiểm chứng sự tồn tại của tài liệu mà <strong>không đọc được nội dung</strong>.</p></div>
  <div class="process-step accent-green"><div class="step-number">02</div><h3>Toàn vẹn</h3><p>Chỉ cần đổi một dấu phẩy, hash sẽ khác hẳn và mọi chỉnh sửa đều lộ ra ngay.</p></div>
  <div class="process-step accent-violet"><div class="step-number">03</div><h3>Xác thực</h3><p>Tổ chức phát hành đính kèm <strong>chữ ký số</strong> của mình để chứng minh nguồn gốc tài liệu.</p></div>
</div>

<p class="formula-source">Theo Chương 7 · Schär & Berentsen</p>

---
layout: content-card
---

<div class="deck-kicker">C7 · Slide 2 — Token hóa</div>

# Colored Coins đến ERC-20/721



- **Colored Coins:** "tô màu" Satoshi bằng metadata → đại diện cổ phiếu, vàng, vé.
- **ERC-20 / ERC-721:** token khả hoán / NFT trên hợp đồng thông minh — chuyển nhượng bằng code.
- **Mất cân bằng:** giá trị ngoại chuỗi tăng tải + áp lực bảo mật, nhưng thợ đào **không được chia** lợi ích đó.



<p class="formula-source">Theo Chương 7 · Schär & Berentsen</p>

---
layout: two-cols-custom
---

::header::

<div class="deck-kicker">C7 · Slide 3 — Hợp đồng thông minh</div>

::default::

## <span class="i-mdi-file-document-check"></span> Điều khoản tự thực thi

**Điều khoản số hóa, tự thực thi** khi đủ điều kiện — không cần tòa án.



- **EOA:** khóa riêng kiểm soát, không chứa code, chỉ ký/gửi TX.
- **Contract (CA):** chạy bằng code, tự kích hoạt khi nhận TX.



::right::

## <span class="i-mdi-swap-horizontal"></span> Hợp đồng trên UTXO

Thiết kế phức tạp **off-chain**, gửi lên mạng xác minh:



- **Atomic swap:** tiền ↔ hàng hoán đổi đồng thời, hết rủi ro quỵt.
- **Vay thế chấp:** multisig **2/2** + `nLockTime` → vừa bảo vệ chủ nợ, vừa bảo vệ tài sản thế chấp.



---
layout: content-card
---

<div class="deck-kicker">C7 · Slide 4 — Oracle</div>

# Blockchain không thấy thế giới thực

<p class="deck-lead">Blockchain là một hệ thống đóng và bị cô lập, vì vậy nó cần <strong>Oracle</strong> để đưa dữ liệu của thế giới thực vào, chẳng hạn như giá vàng, tỷ số trận đấu hay thời tiết.</p>

<div class="split-board">
  <div class="focus-panel accent-red">
    <div>
      <span class="badge badge-danger">Rủi ro tập trung</span>
      <h2>Tin 1 Oracle = mất phi tập trung</h2>
    </div>
    <div>
      <p>Nếu tin tưởng một Oracle duy nhất, dữ liệu giả mạo có thể lọt vào chuỗi và phá vỡ tính phi tập trung của toàn hệ thống.</p>
      <p><strong>Giải pháp</strong> là tổng hợp nhiều nguồn dữ liệu độc lập và yêu cầu đạt ngưỡng chữ ký.</p>
    </div>
  </div>

  <div class="formula-explain">
    <h3>Ngưỡng thực thi</h3>
    <ul>
      <li>Hợp đồng chỉ được thực thi khi thu thập đủ <span class="inline-formula">$m$-trên-$(2m-1)$</span> chữ ký.</li>
      <li>Các nguồn dữ liệu phải <strong>độc lập</strong> với nhau.</li>
      <li>Một nguồn bị thao túng <strong>không đủ sức</strong> quyết định kết quả chung.</li>
    </ul>
  </div>
</div>

<p class="formula-source">Theo Chương 7 · Schär & Berentsen</p>

---
layout: chapter
chapterNumber: 8
eyebrow: Phần III · Further Remarks
---

# Chương 8

## HƯỚNG DẪN THỰC HÀNH BITCOIN

Cách mua, lưu trữ và chấp nhận thanh toán bằng Bitcoin.

---
layout: content-card
---

<div class="deck-kicker">C8 · Slide 1 — Sở hữu</div>

# Mua Bitcoin ở đâu? Cẩn thận bẫy

<div class="card-grid-2">
  <div class="feature-card signal-card accent-amber"><div class="icon-bubble"><span class="i-mdi-account-group"></span></div><div><h3>OTC & ATM</h3><p><strong>OTC</strong> có tính riêng tư cao nhưng tiềm ẩn rủi ro lừa đảo ngoài đời thực. <strong>ATM</strong> nhận tiền mặt trực tiếp nhưng <strong>mức phí cực kỳ đắt đỏ</strong>.</p></div></div>
  <div class="feature-card signal-card accent-blue"><div class="icon-bubble"><span class="i-mdi-bank"></span></div><div><h3>Sàn tập trung (CEX)</h3><p>Sàn tập trung tiện lợi và thanh khoản cao, nhưng người dùng phải <strong>KYC</strong> và đối mặt rủi ro sập sàn, hack hoặc đóng băng tài khoản.</p></div></div>
</div>

<div class="callout-band accent-red">
  <div class="statement-number">!</div>
  <div><h3>Cloud Mining đa số là Ponzi biến tướng</h3><p>Đào bằng PC hay laptop cá nhân không thể sinh lời — chỉ hạ tầng ASIC quy mô lớn mới đào được. <strong>Tuyệt đối không mua khóa riêng do người khác tạo sẵn.</strong></p></div>
</div>

<p class="formula-source">Theo Chương 8 · Schär & Berentsen</p>

---
layout: content-card
---

<div class="deck-kicker">C8 · Slide 2 — Lưu trữ</div>

# Not your keys, not your coins

<div class="split-board">
  <div class="focus-panel accent-red">
    <div>
      <span class="badge badge-danger">Nóng để tiêu — lạnh để giữ</span>
      <h2>Sao lưu quyết định tất cả</h2>
    </div>
    <div>
      <p><strong>Ví nóng (Hot)</strong> là các ứng dụng có kết nối mạng: tiện cho chi tiêu hằng ngày nhưng dễ dính mã độc và hack, vì vậy không nên để tiền dài hạn trên sàn.</p>
      <p><strong>Ví lạnh (Cold)</strong> ký giao dịch ngoại tuyến, điển hình là <strong>ví phần cứng</strong> và <strong>ví giấy</strong> kèm mã QR — lưu ý <strong>xóa bộ nhớ máy in</strong> sau khi in.</p>
      <p>Ở cấp độ <strong>nâng cao</strong>, người dùng có thể dùng <strong>Shamir Secret Sharing</strong> hoặc <strong>Multisig</strong> để chống mất mát và chống cưỡng đoạt.</p>
    </div>
  </div>

  <figure class="report-figure">
    <img src="/media-wallet.svg" alt="Ví nóng và ví lạnh" />
    <figcaption>Nóng để tiêu, lạnh để giữ. Sao lưu quyết định tất cả.</figcaption>
  </figure>
</div>

<p class="formula-source">Theo Chương 8 · Schär & Berentsen</p>

---
layout: content-card
---

<div class="deck-kicker">C8 · Slide 3 — Kinh doanh</div>

# Nhận Bitcoin cho cửa hàng

<p class="deck-lead">Chủ cửa hàng có thể kết hợp mã QR, xpub và cổng quy đổi để nhận BTC mà không phải gánh rủi ro biến động giá.</p>

<CodePanel badge="BIP21" title="Thanh toán không giữ khóa" tone="green" caption="Server chỉ giữ xpub — bị hack cũng không mất tiền">

```text
BIP21:  bitcoin:bc1q…?amount=0.001&label=don-hang-42
xpub:   server chỉ giữ xpub → mỗi đơn 1 địa chỉ mới
        bị hack server cũng KHÔNG mất tiền
quy đổi: BTC → VND tức thời, khỏi lo tỷ giá
```

</CodePanel>

<p class="formula-source">Theo Chương 8 · Schär & Berentsen</p>

---
layout: content-card
---

<div class="deck-kicker">Kết luận · 3 phần · 8 chương</div>

# Bitcoin = ảo + phi tập trung + cạnh tranh

<div class="card-grid-3">
  <div class="feature-card signal-card accent-blue"><div class="icon-bubble"><span class="i-twemoji-books"></span></div><div><h3>Part I · C1–C2</h3><p>Sách mở đầu từ quan niệm tiền là trí nhớ, rồi cho thấy Bitcoin số hóa niềm tin bằng toán học.</p></div></div>
  <div class="feature-card signal-card accent-amber"><div class="icon-bubble"><span class="i-mdi-cogs"></span></div><div><h3>Part II · C3–C5</h3><p>Từ lan truyền trên mạng P2P và xác thực bằng mật mã cho đến đồng thuận PoW.</p></div></div>
  <div class="feature-card signal-card accent-green"><div class="icon-bubble"><span class="i-twemoji-rocket"></span></div><div><h3>Part III · C6–C8</h3><p>Từ thách thức giá cả, quy mô và năng lượng cho đến ứng dụng mở rộng và quyền tự quản chìa khóa.</p></div></div>
</div>

<div class="callout-band accent-green">
  <div class="statement-number">08</div>
  <div><h3>Not your keys, not your coins</h3><p>Tự cầm chìa khóa — tự chịu trách nhiệm.</p></div>
</div>

---
layout: content-card
---

<div class="deck-kicker">Nguồn tài liệu</div>

# Nguồn & cách dùng



- **Giáo trình:** Fabian Schär & Aleksander Berentsen — *Bitcoin, Blockchain, and Cryptoassets: A Comprehensive Introduction* ([MIT Press](https://mitpress.mit.edu/9780262545228/bitcoin-blockchain-and-cryptoassets/)).
- **Nội dung slide:** lược dịch tiếng Việt, bám sát 3 phần · 8 chương của sách — không thêm nội dung ngoài sách.
- **Trình chiếu:** [Slidev](https://sli.dev).
- **Nhóm trình bày:** ĐH Đà Lạt, Khoa CNTT.



---
layout: none
---

<EndSlide
  github-label="github.com/Tsuru-chan/Blockchain"
  github-url="https://github.com/Tsuru-chan/Blockchain"
/>
