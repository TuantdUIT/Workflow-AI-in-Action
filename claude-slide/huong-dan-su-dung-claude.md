# Hướng dẫn sử dụng Claude AI cho team

> Tài liệu onboarding: từ cấu hình ban đầu, bộ nhớ, project, đến việc để Claude
> thao tác trực tiếp trên trình duyệt và code cùng bạn trong VS Code / terminal.
>
> Lưu ý: sản phẩm của Anthropic cập nhật rất nhanh. Các bước dưới đây đúng tại thời
> điểm biên soạn; khi có khác biệt, ưu tiên tài liệu chính thức ở mục [Nguồn](#nguồn-chính-thức).

---

## Mục lục
1. [Cấu hình ban đầu — để Claude biết bạn là ai](#1-cấu-hình-ban-đầu--để-claude-biết-bạn-là-ai)
2. [Memory — bộ nhớ xuyên hội thoại](#2-memory--bộ-nhớ-xuyên-hội-thoại)
3. [Projects — không gian làm việc có instructions & knowledge](#3-projects--không-gian-làm-việc-có-instructions--knowledge)
4. [Claude for Chrome — đọc & thao tác trực tiếp trên trình duyệt](#4-claude-for-chrome--đọc--thao-tác-trực-tiếp-trên-trình-duyệt)
5. [Claude Code — VS Code extension & CLI](#5-claude-code--vs-code-extension--cli)
6. [Claude Code + Chrome — debug lỗi khi chạy thử app](#6-claude-code--chrome--debug-lỗi-khi-chạy-thử-app)

---

## 1. Cấu hình ban đầu — để Claude biết bạn là ai

Claude có **3 lớp cá nhân hoá**, xếp chồng lên nhau. Hiểu đúng lớp nào làm gì thì
sẽ không phải lặp lại context trong mỗi câu hỏi.

Mở cấu hình: bấm **chữ cái viết tắt tên bạn ở góc dưới bên trái** → **Settings**.

| Lớp | Ở đâu | Tác dụng | Phạm vi |
|---|---|---|---|
| **Profile** | Settings → Profile | "What should Claude call you?" (tên) và "What best describes your work?" (mô tả công việc) | Toàn tài khoản |
| **Personal preferences** | Settings → Profile → ô "What preferences should Claude consider in responses?" | Cách bạn muốn Claude trả lời: thuật ngữ hay dùng, phương pháp ưa thích, phong cách giao tiếp chung | Mọi hội thoại |
| **Styles** | Chọn ngay trên khung chat | Điều chỉnh **giọng & format**: Normal / Concise / Explanatory / Formal, hoặc tạo style riêng (mô tả, hoặc upload mẫu văn bản của bạn) | Theo từng chat |

Gợi ý điền cho một dev (ví dụ):

- **Call you:** tên hoặc nickname bạn muốn Claude gọi.
- **Your work:** ví dụ "Full-stack developer (frontend, backend, database, big data)".
- **Preferences:** "Trả lời ngắn gọn, ưu tiên ví dụ code thực tế. Stack chính: … . Giải thích khái niệm nền tảng trước khi đi vào nâng cao. Nếu tôi sai, cứ phản biện thẳng."

Vài điểm hữu ích khác trong Settings:

- **Search and reference chats:** cho phép Claude tìm lại nội dung các hội thoại cũ để tiếp nối mạch làm việc (bật/tắt trong Profile → Preferences).
- **Styles** khác với preferences ở chỗ: preferences là *ngữ cảnh/nội dung*, còn styles là *cách trình bày*.

---

## 2. Memory — bộ nhớ xuyên hội thoại

Memory giúp Claude **nhớ context giữa các cuộc trò chuyện khác nhau** (sở thích làm
việc, dự án đang chạy, quy ước của team) nên bạn không phải giải thích lại từ đầu mỗi lần.

**Cách bật:** Settings → **Capabilities** → mục **Memory** → bật. Lúc thiết lập, bạn có
thể cho Claude **tạo memory từ các chat cũ** để có sẵn ngữ cảnh.

**Bản chất:** Claude không lưu nguyên văn hội thoại, mà lưu một **bản tóm tắt** hướng
tới ngữ cảnh công việc. Bạn **xem và sửa được** bản tóm tắt này bất cứ lúc nào.

Điều nên biết:

- **Memory theo từng project:** mỗi project có vùng nhớ riêng, không lẫn sang project khác.
- **Incognito chat:** bấm biểu tượng **con ma** ở góc trên bên phải để bật chat ẩn danh — Claude **không** lưu chat đó vào memory hay lịch sử. Đóng chat ẩn danh khi muốn Claude nhớ lại như bình thường.
- **Reset memory:** xoá vĩnh viễn toàn bộ memory (kể cả project memory) — không hoàn tác được.
- **Import/Export:** có thể mang memory từ công cụ AI khác sang, hoặc export để sao lưu / di chuyển.
- Claude được thiết kế để **không ghi nhớ** mật khẩu, API key, số thẻ… kể cả khi bạn yêu cầu.

Thử ngay sau khi bật: hỏi *"tuần trước chúng ta đang làm gì?"* để xem Claude nhớ được gì.

---

## 3. Projects — không gian làm việc có instructions & knowledge

**Project** là một workspace cố định gói 3 thứ lại: **project instructions** (chỉ dẫn
đứng sẵn), **knowledge base** (tài liệu tham chiếu), và các **chat** nằm trong đó — nhờ
vậy không phải upload lại file hay giải thích lại vai trò mỗi lần mở chat mới.

**Tạo project:** vào **Projects** ở sidebar trái (hoặc `claude.ai/projects`) → **New
Project** → đặt tên + trả lời "What are you working on / trying to achieve".

**Project instructions** — phần mạnh nhất:

- Viết một lần, **tự nạp vào đầu mọi cuộc chat** trong project.
- Dùng để đặt vai trò, tone, quy ước, ràng buộc. Ví dụ: "Bạn là trợ lý code cho dự án
  X dùng Next.js + TypeScript strict + PostgreSQL. Trả lời ngắn gọn, kèm ví dụ. **KHÔNG**
  gợi ý đổi framework."
- Mẹo: dùng danh sách **"KHÔNG được…"** thường hiệu quả hơn liệt kê điều nên làm; và
  **tinh chỉnh sau 3–5 chat** khi thấy Claude lặp lại lỗi hoặc thiếu context.

**Knowledge base:**

- Bấm nút **"+"** để tải lên tài liệu, text, code, file… Claude dùng chúng làm ngữ cảnh
  cho mọi chat trong project.
- **Enhanced project knowledge (RAG)** — Claude tìm kiếm trong tài liệu đã upload — chỉ có
  ở các gói **trả phí** (Pro, Max, Team, Enterprise).

Lưu ý quan trọng về cách hoạt động:

- Các chat trong cùng project **không chia sẻ lịch sử tin nhắn với nhau**; thứ được chia
  sẻ là **instructions + knowledge (+ project memory)**. Nhờ vậy có thể chạy nhiều luồng
  song song mà không lẫn.
- **Xếp chồng với Profile:** preferences (toàn tài khoản) nạp trước, rồi project
  instructions bổ sung phía trên. Không cần lặp lại "hãy ngắn gọn" trong mỗi project nếu
  đã đặt ở preferences.
- **Số lượng:** Projects có trên mọi gói; tài khoản **free tạo tối đa 5 project**.
- **Team/Enterprise:** chia sẻ project với phân quyền **Can view / Can edit / Owner** để cả
  team làm việc trên cùng một nền tảng ngữ cảnh.

> **Trước khi upload:** che/loại bỏ thông tin nhạy cảm (định danh cá nhân, tài chính,
> credentials) khỏi tài liệu.

---

## 4. Claude for Chrome — đọc & thao tác trực tiếp trên trình duyệt

Đây là **extension trình duyệt** (tên trên store: **"Claude in Chrome"**) biến Claude từ
chatbot thành **agent điều khiển trình duyệt**: đọc nội dung trang, click nút, điền form,
chuyển tab, chạy quy trình nhiều bước… ngay trong phiên đăng nhập hiện tại của bạn.

**Cài đặt & bật:**

1. Mở **Chrome Web Store**, tìm **"Claude in Chrome"** → **Add to Chrome**.
2. Đăng nhập bằng tài khoản Claude **trả phí** (Pro / Max / Team / Enterprise — không có ở gói free).
3. **Pin** extension (bấm icon mảnh ghép trên thanh công cụ).
4. Cấp quyền theo hướng dẫn; Claude mở trong **side panel** cạnh trang bạn đang xem.

**Chế độ quyền:**

- **Ask before acting** — hỏi trước mỗi hành động (nên dùng khi mới bắt đầu).
- **Act without asking** — tự làm không hỏi từng bước.
- Phân quyền **theo từng site**: bạn chọn domain nào Claude được đọc/thao tác, gỡ quyền
  bất cứ lúc nào trong Settings.

**Làm được gì:** tóm tắt bài dài, trích bảng ra CSV, tự điền các trường lặp đi lặp lại,
đi qua quy trình nhiều bước (đặt vé, điền form, thao tác trên dashboard bạn đã đăng nhập),
và cả **tác vụ theo lịch**.

> ⚠️ **An toàn — prompt injection:** vì Claude hành động *với tư cách là bạn* trong phiên đã
> đăng nhập, một trang web độc hại có thể giấu chỉ thị để đánh lừa Claude. Hãy chỉ cấp
> quyền cho các site tin cậy, để **Ask before acting** cho tác vụ nhạy cảm, và luôn xác nhận
> các hành động rủi ro cao (mua hàng, gửi/đăng dữ liệu, chia sẻ thông tin cá nhân).

---

## 5. Claude Code — VS Code extension & CLI

**Claude Code** là công cụ coding "agentic": Claude tự đọc, sửa, chạy trong codebase của
bạn. Dùng được qua **extension VS Code** (giao diện đồ hoạ) và **CLI** (terminal). Cần một
gói **trả phí** (Pro/Max/Team/Enterprise) hoặc tài khoản Console — **không bắt buộc API key**.

### 5a. Extension cho VS Code

- **Cài:** mở Extensions (`Cmd/Ctrl+Shift+X`) → tìm **"Claude Code"** → Install. Yêu cầu **VS
  Code 1.94+**. (Cài được cả trên Cursor, Windsurf, VSCodium…)
- **Mở:** bấm biểu tượng **Spark (✱)** ở góc phải editor (chỉ hiện khi đang mở một file), hoặc
  ở Activity Bar / Status Bar / Command Palette.
- **Đăng nhập:** lần đầu mở panel → **Sign in** → xác thực qua trình duyệt.

Tính năng chính trong panel:

- **Permission modes** (đổi ở đáy khung nhập): **Manual** (hỏi trước khi sửa file/chạy
  lệnh) · **Plan** (mô tả kế hoạch, chờ bạn duyệt — mở ra file Markdown để bạn comment) ·
  **Edit automatically** (tự sửa không hỏi).
- **Diff review:** mọi thay đổi hiện dạng so sánh cạnh nhau để bạn Accept/Reject.
- **@-mentions:** gõ `@` để đưa file/thư mục vào ngữ cảnh; nhấn `Option+K` (Mac) / `Alt+K`
  (Win/Linux) để chèn tham chiếu **kèm số dòng** đang chọn, ví dụ `@app.ts#5-10`.
- **Checkpoints:** rê chuột lên một tin nhắn để **rewind** code hoặc fork hội thoại về trạng thái trước.
- **`/usage`:** xem gói, mức dùng theo phiên/tuần, và thứ đang tiêu tốn quota.

### 5b. CLI

Cài **native binary** (khuyến nghị — không cần Node.js, tự cập nhật nền):

```bash
# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows (PowerShell)
irm https://claude.ai/install.ps1 | iex
```

```bash
claude            # chạy trong thư mục dự án
claude --version  # kiểm tra phiên bản
claude doctor     # chẩn đoán cài đặt / PATH / xung đột
```

> Bản `npm install -g @anthropic-ai/claude-code` vẫn chạy nhưng **đã deprecated cho cài mới**
> (yêu cầu Node 22+) — nên dùng native binary. Extension VS Code có sẵn một bản CLI riêng cho
> panel, nhưng để gõ `claude` trong terminal thì vẫn cần cài CLI standalone (chạy `claude` trong
> **integrated terminal** của VS Code với `` Ctrl+` `` / `` Cmd+` ``).

**CLAUDE.md** — "bộ nhớ dự án" của Claude Code: đặt file này ở gốc repo để ghi quy ước, lệnh
build/test, quyết định kiến trúc… Claude tự đọc mỗi phiên. Chỉ ghi **thứ thật sự quan trọng**
(quy ước team, "vì sao" đằng sau quyết định), đừng nhồi những gì Claude tự suy ra được.

### 5c. Tips tối ưu truy vấn

- **Cụ thể & có phạm vi:** trỏ thẳng file/dòng bằng `@file#dòng` thay vì mô tả mơ hồ.
- **Dùng Plan mode** cho việc phức tạp: duyệt kế hoạch trước khi Claude động vào code.
- **Quản lý ngữ cảnh:** dùng `/compact` khi hội thoại dài; theo dõi thanh context indicator.
- **Extended thinking** khi bài toán khó cần suy luận sâu.
- **Git worktrees** (`claude --worktree <tên>`) để chạy nhiều tác vụ song song không giẫm chân nhau.
- Với log/console: **nói rõ mẫu cần tìm** ("tìm lỗi liên quan auth") thay vì bảo Claude đọc toàn bộ log.

---

## 6. Claude Code + Chrome — debug lỗi khi chạy thử app

Đây là phần trả lời đúng nhu cầu: **chạy thử app trên trình duyệt, có lỗi → để Claude Code
đọc console/DOM và sửa thẳng code** — không phải copy-paste lỗi qua lại.

Claude Code kết nối với chính extension **"Claude in Chrome"** để có khả năng điều khiển
trình duyệt từ CLI hoặc VS Code.

**Yêu cầu:**

- Claude Code **2.0.73+** và extension **Claude in Chrome 1.0.36+**.
- Gói Anthropic trực tiếp (Pro/Max/Team/Enterprise) hoặc API key — **không** qua Bedrock/Vertex/Foundry.
- Chỉ hỗ trợ **Google Chrome và Microsoft Edge** (beta). Chưa hỗ trợ Brave, Arc, WSL.

**Kích hoạt:**

| Nơi dùng | Cách bật |
|---|---|
| **CLI** | `claude --chrome` (bật cho phiên hiện tại). Hoặc gõ `/chrome` rồi chọn **"Enabled by default"** để khỏi thêm cờ mỗi lần. |
| **VS Code extension** | Gõ **`@browser`** trong khung nhập, theo sau là việc cần làm. |
| Kiểm tra công cụ | Gõ `/mcp` rồi chọn **`claude-in-chrome`** để xem danh sách công cụ trình duyệt. |

**Ví dụ prompt debug thực tế:**

```text
@browser mở localhost:3000 và kiểm tra console có lỗi gì không
```
```text
Tôi vừa sửa validation của form đăng nhập. Mở localhost:3000, submit dữ liệu
không hợp lệ, và kiểm tra xem thông báo lỗi có hiện đúng không.
```
```text
Trình duyệt báo TypeError ở UserList.tsx. Đọc lỗi trong console, tìm file nguồn,
và sửa lại với kiểm tra null cho đúng.
```

**Cách nó chạy:** Claude mở một **tab Chrome nhìn thấy được**, thao tác theo thời gian thực,
**dùng chung trạng thái đăng nhập** của bạn (nên vào được các trang bạn đã login mà không cần
API). Gặp trang login hoặc CAPTCHA, Claude **dừng lại nhờ bạn xử lý tay**.

**Chuỗi làm việc điển hình:** sửa code trong VS Code → mở app bằng `@browser`/`--chrome` →
Claude đọc console/network/DOM → xác định nguyên nhân → sửa file nguồn → mở lại kiểm chứng.
Rất hợp cho debug frontend và các vấn đề giao tiếp frontend–backend.

---

## Nguồn chính thức

- Cá nhân hoá (Profile, preferences, styles): https://support.claude.com/en/articles/10185728
- Memory & tìm kiếm chat: https://support.claude.com/en/articles/11817273
- Projects là gì: https://support.claude.com/en/articles/9517075
- Tạo & quản lý Projects: https://support.claude.com/en/articles/9519177
- Claude Code trong VS Code: https://code.claude.com/docs/en/vs-code
- Cài đặt Claude Code (CLI): https://code.claude.com/docs/en/setup
- Claude Code với Chrome (debug): https://code.claude.com/docs/en/chrome
- Claude in Chrome (extension): tìm "Claude in Chrome" trên Chrome Web Store
- Trung tâm hỗ trợ: https://support.claude.com · Tài liệu: https://docs.claude.com
