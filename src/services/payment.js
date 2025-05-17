import { WebApp } from '@twa-dev/sdk';

class PaymentService {
  constructor() {
    this.webApp = WebApp;
  }

  // Инициализация платежа
  async initiatePayment(amount, description) {
    try {
      // Проверяем, что мы в Telegram WebApp
      if (!this.webApp.isVersionAtLeast('6.0')) {
        throw new Error('Требуется более новая версия Telegram');
      }

      // Создаем инвойс для оплаты
      const invoiceParams = {
        title: 'Покупка золотых монет',
        description: description,
        payload: JSON.stringify({
          type: 'coins_purchase',
          amount: amount
        }),
        provider_token: process.env.REACT_APP_PAYMENT_PROVIDER_TOKEN,
        currency: 'STARS',
        prices: [{ label: 'Золотые монеты', amount: amount * 100 }], // amount в копейках
        max_tip_amount: 0,
        suggested_tip_amounts: [],
        protect_content: true
      };

      // Отправляем запрос на создание инвойса
      const result = await this.webApp.showPopup({
        title: 'Подтверждение покупки',
        message: `Вы хотите купить ${amount} золотых монет?`,
        buttons: [
          { id: 'confirm', type: 'ok' },
          { id: 'cancel', type: 'cancel' }
        ]
      });

      if (result === 'confirm') {
        // Открываем окно оплаты
        await this.webApp.openInvoice(invoiceParams);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Ошибка при инициализации платежа:', error);
      throw error;
    }
  }

  // Обработка успешного платежа
  handleSuccessfulPayment(paymentData) {
    try {
      const { amount } = JSON.parse(paymentData.payload);
      
      // Здесь будет логика начисления монет пользователю
      // В реальном приложении здесь будет запрос к бэкенду
      console.log(`Успешная оплата на сумму ${amount} STARS`);
      
      return {
        success: true,
        amount: amount
      };
    } catch (error) {
      console.error('Ошибка при обработке платежа:', error);
      throw error;
    }
  }

  // Получение курса обмена
  getExchangeRate() {
    return {
      '600': 99,
      '3000': 499,
      '9800': 1499,
      '19800': 2999,
      '32800': 4999,
      '64800': 9999
    };
  }
}

export const paymentService = new PaymentService(); 