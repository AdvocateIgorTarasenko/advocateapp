//src\js\service-types-script.js

function redirectToPage(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const url = selectedOption.getAttribute('data-url');

  if (url) {
    window.location.href = url;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentPageUrl = window.location.pathname.split('/').pop();
  const selectElement = document.getElementById('service');

  const pageAliases = {
    'administrative-law.html': 'administrative-law.html',
    'automotive-law.html': 'administrative-law.html',
    'military-law.html': 'military-law.html',
    'military-lawyer.html': 'military-law.html',
  };

  const resolvedPageUrl = pageAliases[currentPageUrl] || currentPageUrl;

  if (selectElement) {
    const options = selectElement.options;
    for (let i = 0; i < options.length; i++) {
      const optionUrl = options[i].getAttribute('data-url');
      if (optionUrl === resolvedPageUrl) {
        options[i].selected = true;
        break;
      }
    }

    // Добавляем обработчик события change
    selectElement.addEventListener('change', () => {
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const url = selectedOption.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  }
});
