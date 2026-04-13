import { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    package: 'standard',
    date: '',
    people: '1',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(result.error || '提交失败，请稍后重试');
      }
    } catch (err) {
      setError('网络错误，请检查网络连接');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-kailash-dark mb-4">预订申请已提交！</h3>
        <p className="text-gray-600 mb-6">
          感谢您的信任。我们的客服人员会在24小时内与您联系，确认行程细节。
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-kailash-gold hover:text-kailash-dark transition"
        >
          继续预订其他行程 →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kailash-gold focus:border-transparent outline-none transition"
            placeholder="请输入您的姓名"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            手机号码 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kailash-gold focus:border-transparent outline-none transition"
            placeholder="请输入手机号码"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          电子邮箱
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kailash-gold focus:border-transparent outline-none transition"
          placeholder="请输入邮箱地址（选填）"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择方案 <span className="text-red-500">*</span>
          </label>
          <select
            name="package"
            required
            value={formData.package}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kailash-gold focus:border-transparent outline-none transition"
          >
            <option value="standard">标准朝圣团 (¥8,800起)</option>
            <option value="premium">尊享朝圣团 (¥15,800起)</option>
            <option value="custom">定制朝圣 (面议)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            预计出行日期 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kailash-gold focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          出行人数
        </label>
        <select
          name="people"
          value={formData.people}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kailash-gold focus:border-transparent outline-none transition"
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} 人</option>
          ))}
          <option value="6+">6人以上</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          备注信息
        </label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-kailash-gold focus:border-transparent outline-none transition resize-none"
          placeholder="如有特殊需求（如饮食禁忌、身体状况等），请在此说明"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-kailash-gold text-kailash-dark py-4 rounded-lg font-semibold text-lg hover:bg-kailash-accent transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            提交中...
          </>
        ) : (
          '提交预订申请'
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        提交即表示您同意我们的服务条款和隐私政策
      </p>
    </form>
  );
}
