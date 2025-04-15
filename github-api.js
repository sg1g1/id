<!DOCTYPE html>
<html lang="ar">
<head>
  <meta charset="UTF-8" />
  <title>حسابات الألعاب</title>
  <style>
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      text-align: center; 
      padding: 30px; 
      direction: rtl; 
      background-color: #e0f7fa; 
      color: #006064;
    }
    
    h2, h3, h4 {
      color: #00838f;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }
    
    input, select { 
      margin: 8px; 
      padding: 12px; 
      width: 220px; 
      border: none; 
      border-radius: 8px; 
      box-shadow: 0 2px 5px rgba(0,131,143,0.2); 
      background-color: #ffffff; 
      transition: all 0.3s ease;
    }
    
    input:focus, select:focus {
      outline: none;
      box-shadow: 0 4px 8px rgba(0,131,143,0.3);
      transform: translateY(-2px);
    }
    
    button { 
      padding: 12px 24px; 
      margin-top: 12px; 
      border: none; 
      border-radius: 8px; 
      background: linear-gradient(135deg, #00bcd4, #0097a7); 
      color: white; 
      font-weight: bold; 
      cursor: pointer; 
      transition: all 0.3s ease; 
      box-shadow: 0 3px 6px rgba(0,131,143,0.3);
    }
    
    button:hover {
      background: linear-gradient(135deg, #0097a7, #00838f);
      transform: translateY(-2px);
      box-shadow: 0 5px 10px rgba(0,131,143,0.4);
    }
    
    #dashboard { 
      display: none; 
      background-image: url('img2.png'); 
      background-size: cover; 
      background-position: center; 
      border-radius: 15px;
      box-shadow: 0 8px 16px rgba(0,131,143,0.2);
      padding: 20px;
      margin-top: 20px;
    }
    
    #addSectionDiv { 
      margin: 25px 0; 
      background: rgba(178, 235, 242, 0.7); 
      padding: 20px; 
      border-radius: 12px; 
      box-shadow: 0 4px 8px rgba(0,131,143,0.2);
    }
    
    #auth { 
      background: linear-gradient(45deg, #006064, #00bcd4, #006064); 
      background-size: 200% 200%;
      animation: gradientBG 10s ease infinite;
      padding: 50px; 
      border-radius: 15px;
      box-shadow: 0 10px 20px rgba(0,131,143,0.3);
    }
    
    @keyframes gradientBG {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    #addFriendSection { 
      background-image: linear-gradient(rgba(0,151,167,0.7), rgba(0,131,143,0.7)), url('img3.png'); 
      background-size: cover; 
      background-position: center; 
      padding: 25px; 
      margin: 25px 0; 
      border-radius: 12px; 
      box-shadow: 0 6px 12px rgba(0,131,143,0.3);
      color: white;
    }
    
    #viewMode { 
      background-image: linear-gradient(rgba(0,188,212,0.7), rgba(0,151,167,0.7)), url('img4.png'); 
      background-size: cover; 
      background-position: center; 
      padding: 25px; 
      margin: 25px 0; 
      border-radius: 12px; 
      box-shadow: 0 6px 12px rgba(0,131,143,0.3);
      color: white;
    }
    
    #friendList { 
      background-image: linear-gradient(rgba(224,247,250,0.8), rgba(178,235,242,0.8)), url('wallpaper.png'); 
      background-size: cover; 
      background-position: center; 
      padding: 25px; 
      border-radius: 12px; 
      min-height: 100vh; 
      width: 100%; 
      margin: 0; 
      box-shadow: 0 8px 16px rgba(0,131,143,0.2);
    }
    
    #friendList li {
      background: rgba(255,255,255,0.8);
      margin: 10px 0;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,131,143,0.2);
      transition: all 0.3s ease;
      list-style-type: none;
    }
    
    #friendList li:hover {
      background: rgba(255,255,255,0.95);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,131,143,0.3);
    }
  </style>
</head>
<body>

  <h2 id="loginTitle">تسجيل أو دخول</h2>

  <div id="auth">
    <input type="text" id="username" placeholder="اسمك"><br>
    <input type="password" id="passcode" placeholder="رمز الدخول"><br>
    <div id="loginError" style="color: #d32f2f; margin: 8px 0; display: none;"></div>
    <button onclick="register()">تسجيل جديد</button>
    <button onclick="login()">دخول</button>
  </div>

  <div id="githubSetup" style="display: none;">
    <input type="hidden" id="githubToken">
  </div>

  <div id="dashboard">
    <h3>أهلاً، <span id="playerName"></span>!</h3>
    <button onclick="logout()">تسجيل الخروج</button>

    <div id="addFriendSection">
      <h4>إضافة ID لصديق:</h4>
      <input type="text" id="friendName" placeholder="اسم الصديق">
      <input type="text" id="friendID" placeholder="ID الصديق">
      <select id="sectionSelect"></select>
      <button onclick="addFriend()">إضافة</button>
    </div>

    <div id="addSectionDiv">
      <h4>إضافة قسم جديد:</h4>
      <input type="text" id="sectionName" placeholder="اسم القسم">
      <button onclick="addSection()">إضافة قسم</button>
    </div>

    <div id="viewMode">
      <h4>عرض حسب القسم:</h4>
      <select id="viewSelect" onchange="renderFriendsView()">
        <option value="all">الكل</option>
      </select>
      <button onclick="showSectionsList()" style="margin-top: 10px;">حذف أحد الأقسام</button>
    </div>

    <h4>الحسابات المحفوظة:</h4>
    <ul id="friendList"></ul>
  </div>

  <!-- إضافة ملف GitHub API -->
  <script src="github-api.js"></script>
  
  <script>
    let currentUser = null;
    let githubStorage = null;

    // تهيئة التخزين في GitHub
    function initGithubStorage() {
      const token = document.getElementById('githubToken').value;
      githubStorage = new GitHubStorage(token);
    }
    
    // تهيئة التخزين عند تحميل الصفحة
    window.onload = async function() {
      initGithubStorage();
      // التحقق من وجود مستخدم مسجل الدخول
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const users = await getUsers();
        if (users && users[savedUser]) {
          currentUser = savedUser;
          document.getElementById("auth").style.display = "none";
          document.getElementById("dashboard").style.display = "block";
          document.getElementById("playerName").textContent = users[savedUser].username;
          await updateSections();
          await renderFriendsView();
        }
      }
    }

    // تنفيذ التهيئة عند تحميل الصفحة
    window.addEventListener('DOMContentLoaded', () => {
      initGithubStorage();
    });

    // وظائف للتعامل مع البيانات
    async function getUsers() {
      // إذا كانت إعدادات GitHub متوفرة، استخدمها
      if (githubStorage) {
        try {
          return await githubStorage.getData();
        } catch (error) {
          console.error('خطأ في جلب البيانات من GitHub:', error);
        }
      }
      
      // محاولة استخدام الخادم المحلي كخيار ثانوي
      try {
        const response = await fetch('api.php');
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.error('خطأ في جلب البيانات من الخادم:', error);
      }
      
      // استخدام التخزين المحلي كنسخة احتياطية
      return JSON.parse(localStorage.getItem("genshinUsers") || "{}");
    }

    async function saveUsers(users) {
      // إذا كانت إعدادات GitHub متوفرة، استخدمها
      if (githubStorage) {
        try {
          const success = await githubStorage.saveData(users);
          if (success) return;
        } catch (error) {
          console.error('خطأ في حفظ البيانات على GitHub:', error);
        }
      }
      
      // محاولة استخدام الخادم المحلي كخيار ثانوي
      try {
        const response = await fetch('api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(users)
        });
        
        if (!response.ok) {
          throw new Error('فشل في حفظ البيانات على الخادم');
        }
      } catch (error) {
        console.error('خطأ في حفظ البيانات على الخادم:', error);
        // حفظ البيانات محلياً كنسخة احتياطية
        localStorage.setItem("genshinUsers", JSON.stringify(users));
      }
    }

    async function register() {
      const username = document.getElementById('username').value.trim();
      const passcode = document.getElementById('passcode').value.trim();

      if (!username || !passcode) {
        alert("يرجى ملء جميع الحقول.");
        return;
      }

      const users = await getUsers();
      if (users[passcode]) {
        alert("الرمز مستخدم مسبقًا. جرب رمزًا آخر.");
        return;
      }

      users[passcode] = { username, sections: [], friends: [] };
      await saveUsers(users);
      alert("تم التسجيل بنجاح!");
    }

    async function login() {
      const passcode = document.getElementById('passcode').value.trim();
      const loginError = document.getElementById('loginError');
      
      if (!passcode) {
        loginError.textContent = "يرجى إدخال رمز الدخول";
        loginError.style.display = "block";
        return;
      }

      try {
        // تهيئة التخزين في GitHub
        initGithubStorage();
        
        // محاولة جلب البيانات
        const users = await getUsers();

        if (users && users[passcode]) {
          currentUser = passcode;
          // حفظ حالة تسجيل الدخول
          localStorage.setItem('currentUser', passcode);
          
          document.getElementById("auth").style.display = "none";
          document.getElementById("dashboard").style.display = "block";
          document.getElementById("playerName").textContent = users[passcode].username;
          document.getElementById("loginTitle").style.display = "none";
          loginError.style.display = "none";
          await updateSections();
          await renderFriendsView();
        } else {
          loginError.textContent = "رمز الدخول غير صحيح أو لم يتم العثور على البيانات";
          loginError.style.display = "block";
          document.getElementById("passcode").value = "";
        }
      } catch (error) {
        console.error('خطأ في تسجيل الدخول:', error);
        loginError.textContent = "حدث خطأ أثناء تسجيل الدخول. يرجى التأكد من اتصال الإنترنت والمحاولة مرة أخرى.";
        loginError.style.display = "block";
      }
    }

    function logout() {
      currentUser = null;
      localStorage.removeItem('currentUser');
      document.getElementById("auth").style.display = "block";
      document.getElementById("dashboard").style.display = "none";
      document.getElementById("loginTitle").style.display = "block";
      document.getElementById("username").value = "";
      document.getElementById("passcode").value = "";
      document.getElementById("loginError").style.display = "none";
    }

    async function addSection() {
      const sectionName = document.getElementById('sectionName').value.trim();
      if (!sectionName) return alert("يرجى إدخال اسم القسم.");

      const users = await getUsers();
      const user = users[currentUser];
      if (!user.sections.includes(sectionName)) {
        user.sections.push(sectionName);
        await saveUsers(users);
        await updateSections();
        document.getElementById('sectionName').value = "";
      } else {
        alert("القسم موجود بالفعل.");
      }
    }

    async function updateSections() {
      const users = await getUsers();
      const user = users[currentUser];
      const sectionSelect = document.getElementById('sectionSelect');
      const viewSelect = document.getElementById('viewSelect');

      sectionSelect.innerHTML = "";
      viewSelect.innerHTML = `<option value="all">الكل</option>`;

      user.sections.forEach(section => {
        const option1 = document.createElement('option');
        option1.value = section;
        option1.textContent = section;
        sectionSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = section;
        option2.textContent = section;
        viewSelect.appendChild(option2);
      });
    }

    async function addFriend() {
      const friendName = document.getElementById('friendName').value.trim();
      const friendID = document.getElementById('friendID').value.trim();
      const section = document.getElementById('sectionSelect').value;

      if (!friendName || !friendID || !section) {
        alert("يرجى ملء جميع الحقول.");
        return;
      }

      const users = await getUsers();
      const user = users[currentUser];
      user.friends.push({ name: friendName, id: friendID, section });
      await saveUsers(users);
      await renderFriendsView();

      document.getElementById('friendName').value = "";
      document.getElementById('friendID').value = "";
    }

    async function renderFriendsView() {
      const users = await getUsers();
      const user = users[currentUser];
      const selectedView = document.getElementById('viewSelect').value;
      const list = document.getElementById('friendList');
      list.innerHTML = "";

      user.friends
        .filter(f => selectedView === "all" || f.section === selectedView)
        .forEach(f => {
          const li = document.createElement("li");
          li.textContent = `${f.name} - ID: ${f.id} ${selectedView === "all" ? `( ${f.section} )` : ""}`;
          
          const deleteBtn = document.createElement("button");
          deleteBtn.innerHTML = "<span style='font-size:16px'>🗑️</span>";
          deleteBtn.style.marginRight = "10px";
          deleteBtn.style.borderRadius = "50%";
          deleteBtn.style.width = "35px";
          deleteBtn.style.height = "35px";
          deleteBtn.style.padding = "5px";
          deleteBtn.onclick = () => deleteFriend(f.id);
          li.insertBefore(deleteBtn, li.firstChild);
          
          const copyBtn = document.createElement("button");
          copyBtn.innerHTML = "<span style='font-size:16px'>📋</span>";
          copyBtn.style.marginRight = "10px";
          copyBtn.style.borderRadius = "50%";
          copyBtn.style.width = "35px";
          copyBtn.style.height = "35px";
          copyBtn.style.padding = "5px";
          copyBtn.onclick = () => {
            navigator.clipboard.writeText(f.id);
            alert("تم نسخ ID بنجاح!");
          };
          li.insertBefore(copyBtn, li.firstChild);
          
          list.appendChild(li);
        });
    }
    
    async function deleteFriend(friendId) {
      const users = await getUsers();
      const user = users[currentUser];
      user.friends = user.friends.filter(f => f.id !== friendId);
      await saveUsers(users);
      await renderFriendsView();
    }
    
    async function showSectionsList() {
      const users = await getUsers();
      const user = users[currentUser];
      let sectionsList = "الأقسام:\n\n";
      
      user.sections.forEach(section => {
        sectionsList += `${section} (${user.friends.filter(f => f.section === section).length} حساب) \n`;
      });
      
      const shouldDelete = confirm(`${sectionsList}\nهل تريد حذف قسم؟`);
      if (shouldDelete) {
        const sectionToDelete = prompt("أدخل اسم القسم الذي تريد حذفه:");
        if (sectionToDelete && user.sections.includes(sectionToDelete)) {
          user.sections = user.sections.filter(s => s !== sectionToDelete);
          user.friends = user.friends.filter(f => f.section !== sectionToDelete);
          await saveUsers(users);
          await updateSections();
          await renderFriendsView();
          alert(`تم حذف قسم ${sectionToDelete} بنجاح!`);
        } else {
          alert("اسم القسم غير صحيح أو غير موجود.");
        }
      }
    }
  </script>

  <script>
    // تنفيذ التهيئة عند تحميل الصفحة
    window.addEventListener('DOMContentLoaded', () => {
      initGithubStorage();
    });
  </script>
</body>
</html>
