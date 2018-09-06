$(document).ready(function () {
	var countSl = 0;
	var servDesign = [],
		servUsability = [],
		servSearch = [],
		servAnalytics = [],
		revImg = [],
		revName = [],
		revPos = [],
		revText = [],
		revStar = [];

	$.ajax({
		url: 'reviews.php',
		type: 'POST',
		data: {
			reviews: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			for (var i in data) {
				revImg.push(data[i]["image"]);
				revName.push(data[i]["name"]);
				revPos.push(data[i]["position"]);
				revText.push(data[i]["text"]);
				revStar.push(data[i]["star"]);
			}
		}
	});

	$.ajax({
		url: 'gui.php',
		type: 'POST',
		data: {
			gui: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			servDesign.push(data["watch"][1]);
			servDesign.push(data["watch"][2]);
			servDesign.push(data["watch"][3]);

			servUsability.push(data["usability"][1]);
			servUsability.push(data["usability"][2]);
			servUsability.push(data["usability"][3]);

			servSearch.push(data["search"][1]);
			servSearch.push(data["search"][2]);
			servSearch.push(data["search"][3]);

			servAnalytics.push(data["analytics"][1]);
			servAnalytics.push(data["analytics"][2]);
			servAnalytics.push(data["analytics"][3]);
		}
	});
	document.addEventListener('click', function (e) {
		e.preventDefault;
		var _this = e.target;
		if (_this.matches('.menuBut')) {
			$('.navigation').fadeIn();
		} else {
			$('.navigation').fadeOut();
		}
	})

	$('.readMore p').on('click', function () {

		$('.textProc').animate({
			height: 70
		}, 200);
		var _this = $(this).parent().parent().children('p');
		if (Number((_this.css('height').replace('px', ''))) > 70) {
			_this.animate({
				height: 70
			}, 200);
		} else {
			_this.animate({
				height: 200
			}, 500);
		}

	});
	$('.readMoreServ p').on('click', function () {
		$('.descriptionText').animate({
			height: 200
		}, 200);
		var _this = $(this).parent().parent().children('p');
		if (Number((_this.css('height').replace('px', ''))) > 200) {
			_this.animate({
				height: 200
			}, 200);
		} else {
			_this.animate({
				height: 300
			}, 500);
		}
	});
	$('.designItem').on('click', function () {
		ServisecFillOut(servDesign);
	});
	$('.usabilityItem').on('click', function () {
		ServisecFillOut(servUsability);
	});
	$('.searchItem').on('click', function () {
		ServisecFillOut(servSearch);
	});
	$('.analyticsItem').on('click', function () {
		ServisecFillOut(servAnalytics);
	});



	$('.next').on('click', function () {
		$('.sliderItem1').animate({
			opacity: 0,
			display: "none"
		}, 200);
		$('.sliderItem2').animate({
			opacity: 0,
			display: "none"
		}, 200);
		countSl += 2;
		if (countSl < 5) {
			setTimeout(function () {
				reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl, '.sliderItem1');
				reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl + 1, '.sliderItem2');
				$('.sliderItem1').animate({
					opacity: 1,
					display: "flex"
				}, 200);
				$('.sliderItem2').animate({
					opacity: 1,
					display: "flex"
				}, 200);
			}, 500);
		} else {
			countSl = 4;
			reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl, '.sliderItem1');
			reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl + 1, '.sliderItem2');
			$('.sliderItem1').animate({
				opacity: 1,
				display: "flex"
			}, 200);
			$('.sliderItem2').animate({
				opacity: 1,
				display: "flex"
			}, 200);
		}
	});


	$('.prev').on('click', function () {
		$('.sliderItem1').animate({
			opacity: 0,
			display: "none"
		}, 200);
		$('.sliderItem2').animate({
			opacity: 0,
			display: "none"
		}, 200);
		countSl -= 2;
		if (countSl >= 0) {
			setTimeout(function () {
				reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl, '.sliderItem1');
				reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl + 1, '.sliderItem2');
				$('.sliderItem1').animate({
					opacity: 1,
					display: "flex"
				}, 200);
				$('.sliderItem2').animate({
					opacity: 1,
					display: "flex"
				}, 200);
			}, 500);
		} else {
			countSl = 0;
			reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl, '.sliderItem1');
			reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl + 1, '.sliderItem2');
			$('.sliderItem1').animate({
				opacity: 1,
				display: "flex"
			}, 200);
			$('.sliderItem2').animate({
				opacity: 1,
				display: "flex"
			}, 200);
		}
	});


	$('.ScrollClass').on('click', function () {
		var scrollToSection = $(this).attr('href');
		if ($(scrollToSection).length != 0) {
			$('html, body').animate({
				scrollTop: $(scrollToSection).offset().top
			}, 1000);
		}
		return false;
	});

});





function reviewsFillOut(revImg, revName, revPos, revText, revStar, countSl, reviewBlock) {
	$(reviewBlock + ' .revImg .revImgItem').attr('src', revImg[countSl]);
	$(reviewBlock + ' .revText').html(revText[countSl]);
	$(reviewBlock + ' .revName').html(revName[countSl] + '<span class="revPos"> ' + revPos[countSl] + '</span>');
	if (revStar[countSl] == 5) {
		$(reviewBlock + ' .revStar').css("background-position", "0px 19px");
	}
	if (revStar[countSl] == 4) {
		$(reviewBlock + ' .revStar').css("background-position", "0px 38px");
	}
	if (revStar[countSl] == 3) {
		$(reviewBlock + ' .revStar').css("background-position", "0px 57px");
	}
	if (revStar[countSl] == 2) {
		$(reviewBlock + ' .revStar').css("background-position", "0px 76px");
	}
	if (revStar[countSl] == 1) {
		$(reviewBlock + ' .revStar').css("background-position", "0px 95px");
	}
}

function ServisecFillOut(arrayToFillout) {
	$('.servImage').attr('src', arrayToFillout[0]);
	$('.servDescr h4').html(arrayToFillout[1]);
	$('.servDescr .descriptionText').html(arrayToFillout[2]);
}
 