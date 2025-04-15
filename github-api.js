/**
 * ملف للتعامل مع GitHub API لتخزين واسترجاع البيانات
 */

class GitHubStorage {
  constructor(token) {
    // إعدادات افتراضية ثابتة
    this.owner = 'genshin-users'; // اسم المستخدم أو المنظمة على GitHub
    this.repo = 'data-storage'; // اسم المستودع
    this.path = 'users_data.json'; // مسار الملف في المستودع
    this.branch = 'main'; // الفرع المستخدم
    this.token = token; // رمز الوصول الشخصي لـ GitHub
    this.lastFetchTime = 0; // وقت آخر تحديث للبيانات
    this.pollingInterval = 5000; // فترة التحديث التلقائي (5 ثواني)
    this.isPolling = false; // حالة التحديث التلقائي
  }

  /**
   * بدء عملية التحديث التلقائي للبيانات
   */
  startPolling(callback) {
    if (this.isPolling) return;
    this.isPolling = true;

    const poll = async () => {
      if (!this.isPolling) return;

      try {
        const data = await this.getData(true);
        if (callback && typeof callback === 'function') {
          callback(data);
        }
      } catch (error) {
        console.error('خطأ في التحديث التلقائي:', error);
      }

      setTimeout(poll, this.pollingInterval);
    };

    poll();
  }

  /**
   * إيقاف عملية التحديث التلقائي
   */
  stopPolling() {
    this.isPolling = false;
  }

  /**
   * الحصول على البيانات من GitHub
   */
  async getData(forceUpdate = false) {
    try {
      // التحقق من وقت آخر تحديث لتجنب التحديثات المتكررة
      const now = Date.now();
      if (!forceUpdate && (now - this.lastFetchTime) < this.pollingInterval) {
        return JSON.parse(localStorage.getItem("genshinUsers") || "{}");
      }

      const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`, {
        headers: this.token ? { 'Authorization': `token ${this.token}` } : {}
      });

      if (response.status === 404) {
        // الملف غير موجود، إرجاع كائن فارغ
        return {};
      }

      if (!response.ok) {
        throw new Error(`فشل في جلب البيانات: ${response.status}`);
      }

      const data = await response.json();
      // فك تشفير المحتوى من Base64
      const content = atob(data.content);
      const parsedData = JSON.parse(content);
      
      // تحديث التخزين المحلي والوقت
      localStorage.setItem("genshinUsers", JSON.stringify(parsedData));
      this.lastFetchTime = now;
      
      return parsedData;
    } catch (error) {
      console.error('خطأ في جلب البيانات من GitHub:', error);
      // استخدام التخزين المحلي كنسخة احتياطية
      return JSON.parse(localStorage.getItem("genshinUsers") || "{}");
    }
  }

  /**
   * حفظ البيانات في GitHub
   */
  async saveData(data) {
    try {
      const content = JSON.stringify(data, null, 2);
      
      // تحديث التخزين المحلي فوراً
      localStorage.setItem("genshinUsers", JSON.stringify(data));
      
      // الحصول على معلومات الملف الحالي (إذا كان موجودًا) للحصول على SHA
      let sha = null;
      try {
        const fileResponse = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`, {
          headers: this.token ? { 'Authorization': `token ${this.token}` } : {}
        });
        
        if (fileResponse.ok) {
          const fileData = await fileResponse.json();
          sha = fileData.sha;
        }
      } catch (error) {
        // الملف غير موجود، سيتم إنشاؤه
      }

      // إنشاء أو تحديث الملف
      const updateResponse = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${this.token}`
        },
        body: JSON.stringify({
          message: 'تحديث بيانات المستخدمين',
          content: btoa(content), // تشفير المحتوى بـ Base64
          sha: sha,
          branch: this.branch
        })
      });

      if (!updateResponse.ok) {
        throw new Error(`فشل في حفظ البيانات: ${updateResponse.status}`);
      }

      // تحديث وقت آخر جلب للبيانات
      this.lastFetchTime = Date.now();
      return true;
    } catch (error) {
      console.error('خطأ في حفظ البيانات على GitHub:', error);
      // حفظ البيانات محلياً كنسخة احتياطية
      localStorage.setItem("genshinUsers", JSON.stringify(data));
      return false;
    }
  }
}

// تصدير الكلاس للاستخدام في الملفات الأخرى
window.GitHubStorage = GitHubStorage;
