// Функция рендера профилей из массива данных профилей
function renderProfilesCard(profiles) {
  const container = $(".profiles__grid");
  const template = $("#profile-card-template").html();

  profiles.forEach((profile, index) => {
    const profileTemplate = $(template);

    // Скрываем элемент перед добавлением
    profileTemplate.css("opacity", 0);

    // Аватарка
    profileTemplate.find(".profile-card__image").attr("src", profile.images[0]);
    // Смайлик
    const profileSmile = profileTemplate.find(".profile-card__smile");
    if (!!profile.smile) {
      profileSmile.text(profile.smile);
    } else {
      profileSmile.remove();
    }

    // Дистанция
    profileTemplate
      .find(".profile-card__distance")
      .text("~" + profile.distance + " km");
    if (!profile.online) {
      profileTemplate.find(".profile-card__status").remove();
    }

    // Кол-во Фото
    const profileCount = profileTemplate.find(".profile-card__photos");
    if (profile.images.length > 1) {
      profileCount.text(profile.images.length);
    } else {
      profileCount.remove();
    }

    // Имя, возраст
    profileTemplate
      .find(".profile-card__name")
      .text(profile.name + ", " + profile.age);

    profileTemplate.find(".profile-card__location").text(profile.city);

    container.append(profileTemplate);
    // Анимация появления
    setTimeout(() => {
      profileTemplate.animate({ opacity: 1 }, 300);
    }, index * 50);
  });
}

// Функция сортировки строк
function compareString(a, b) {
  if (a.city > b.city) return 1;
  if (a.city < b.city) return -1;
  return 0;
}

// Функция рендера профилей по критериям
function renderSortedProfilesCard(profiles, criteria) {
  // Очищаем контейнер
  const container = $(".profiles__grid");
  container.empty();

  // Сортируем профили по заданному критерию
  const sortedProfiles = [...profiles].sort((a, b) => {
    if (criteria === "age") {
      return a.age - b.age;
    } else if (criteria === "city") {
      return compareString(a, b);
    } else {
      return 0;
    }
  });

  // Рендерим отсортированные профили
  renderProfilesCard(sortedProfiles);
}

$(document).ready(function () {
  const profiles = [
    {
      images: ["./assets/avatars/01.png"],
      smile: "😊",
      distance: "320",
      name: "Ирина",
      age: 27,
      city: "Москва",
      online: false,
    },
    {
      images: ["./assets/avatars/02.png", "./assets/avatars/03.png"],
      smile: "",
      distance: "450",
      name: "Кристина",
      age: 30,
      city: "Санкт-Петербург",
      online: true,
    },
    {
      images: ["./assets/avatars/03.png"],
      smile: "😎",
      distance: "780",
      name: "Вероника",
      age: 29,
      city: "Новосибирск",
      online: false,
    },
    {
      images: ["./assets/avatars/04.png", "./assets/avatars/01.png"],
      smile: "🎉",
      distance: "600",
      name: "Жанна",
      age: 25,
      city: "Москва",
      online: true,
    },
    {
      images: ["./assets/avatars/05.png"],
      smile: "🔥",
      distance: "150",
      name: "Александра",
      age: 32,
      city: "Санкт-Петербург",
      online: false,
    },
    {
      images: [
        "./assets/avatars/06.png",
        "./assets/avatars/04.png",
        "./assets/avatars/01.png",
      ],
      smile: "",
      distance: "900",
      name: "Нина",
      age: 40,
      city: "Новосибирск",
      online: true,
    },
    {
      images: ["./assets/avatars/07.png"],
      smile: "🌟",
      distance: "500",
      name: "Ольга",
      age: 25,
      city: "Москва",
      online: false,
    },
    {
      images: ["./assets/avatars/08.png", "./assets/avatars/02.png"],
      smile: "🚴‍♀️",
      distance: "700",
      name: "Маша",
      age: 21,
      city: "Санкт-Петербург",
      online: true,
    },
    {
      images: ["./assets/avatars/09.png"],
      smile: "",
      distance: "250",
      name: "Марина",
      age: 27,
      city: "Новосибирск",
      online: false,
    },
    {
      images: ["./assets/avatars/10.png", "./assets/avatars/03.png"],
      smile: "🏆",
      distance: "980",
      name: "Ольга",
      age: 29,
      city: "Москва",
      online: true,
    },
    {
      images: ["./assets/avatars/11.png"],
      smile: "🤖",
      distance: "370",
      name: "Катя",
      age: 28,
      city: "Санкт-Петербург",
      online: false,
    },
    {
      images: [
        "./assets/avatars/12.png",
        "./assets/avatars/02.png",
        "./assets/avatars/01.png",
      ],
      smile: "🎮",
      distance: "830",
      name: "Эмилия",
      age: 34,
      city: "Новосибирск",
      online: true,
    },
  ];

  renderProfilesCard(profiles);

  // Открытие сортировки
  $(".filter__toggler").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  $("body").on("click", function () {
    if (!$(event.target).closest(".filter").length) {
      $(".filter").removeClass("active");
    }
  });

  // Прослушка инпутов для сортировки
  $(".filter__radio input").on("change", function () {
    const sortCriteria = $(this).val();
    renderSortedProfilesCard(profiles, sortCriteria);
  });
});
