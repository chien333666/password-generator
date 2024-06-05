const submitButton = document.querySelector("#submit-btn");
const form = document.querySelector("#form");

submitButton.addEventListener("click", function onSubmitButtonClicked(event) {
  // 阻止表單的預設提交行為
  event.preventDefault();
  event.stopPropagation();

  // 呼叫on form submitted中的程式碼來產生並顯示密碼
  onFormSubmitted(event);
});

function onFormSubmitted(event) {
  // 阻止表單的預設提交行為
  event.preventDefault();
  event.stopPropagation();

  // 取得表單數據
  const passwordLength = document.getElementById('passwordLength').value;
  const lowercase = document.getElementById('lowercase').checked;
  const uppercase = document.getElementById('uppercase').checked;
  const numbers = document.getElementById('numbers').checked;
  const symbols = document.getElementById('symbols').checked;
  const excludeChars = document.getElementById('exclude').value;

  // 如果密碼長度不符合要求，則return false
  function isValidPasswordLength(length) {
    // 檢查 length 是否包含小數點
    if (length.includes('.')) {
      alert('Password length must be an integer without decimal points.');
      return false;
    }
    return length >= 4 && length <= 16;
  }

  // 檢查密碼長度是否有效
  if (!isValidPasswordLength(passwordLength)) {
    alert('Password length must be between 4 and 16.');
    return; // 停止函數執行
  }




  function checkCharacterTypes() {
    const uppercaseChecked = document.getElementById('uppercase').checked;
    const lowercaseChecked = document.getElementById('lowercase').checked;
    const numbersChecked = document.getElementById('numbers').checked;
    const symbolsChecked = document.getElementById('symbols').checked;
    // 檢查是否至少選擇了一種字符類型
    if (!uppercaseChecked && !lowercaseChecked && !numbersChecked && !symbolsChecked) {
      alert('Please select at least one character type.');
      return false; // 表示驗證失敗
    }

    return true; // 表示驗證成功
  }

  // 在生成並顯示密碼後，更改背景顏色
  function updateBackgroundColor() {
    const passwordLabel = document.getElementById('your-password');
    const passwordGenerated = document.getElementById('generated-password');
    // 使用bootstrap的bg success類別作為示例，可以根據需要更換其他類別
    passwordLabel.classList.add('bg-custom-cyan'); // 添加背景顏色
    passwordGenerated.classList.add('text-danger'); // 添加文字顏色以提高可讀性
  }

  // 檢查字元類型是否至少選取了一種
  if (!checkCharacterTypes()) {
    return; // 停止函數執行
  }

  // 根據選項狀態動態建立可用的字元集
  let availableChars = '';
  if (lowercase) availableChars += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) availableChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) availableChars += '0123456789';
  if (symbols) availableChars += '@#$%^&*()';

  // 如果排除特定字符，則從available chars中移除這些字符
  if (excludeChars) {
    excludeChars.split('').forEach(char => {
      // 這裡添加了對特殊字符的轉義
      const escapedChar = char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      availableChars = availableChars.replace(new RegExp(escapedChar, 'g'), '');
    });
  }

  // 產生密碼
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  // 顯示產生的密碼
  document.getElementById('generated-password').innerText = `${password}`;
  updateBackgroundColor();

  form.querySelectorAll("input").forEach((element) => {
    if (!element.checkValidity()) {
      const feedback = element.parentElement.querySelector(".invalid-feedback");
      feedback.textContent = element.validationMessage;
    }
  });

}