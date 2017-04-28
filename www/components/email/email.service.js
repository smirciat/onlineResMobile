'use strict';

angular.module('workspaceApp')
  .factory('email', function ($http,tcFactory,Auth) {
    var template = function(res) {
      return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
        '<html xmlns="http://www.w3.org/1999/xhtml" style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
        '<head>'+
        '<meta name="viewport" content="width=device-width" />' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        '<title>Alerts e.g. approaching your limit</title>' +
        '<style type="text/css">' +
        'img {'+
        'max-width: 100%;' +
        '}' +
        'body {' +
        '-webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em;' +
        '}' +
        'body {' +
        'background-color: #f6f6f6;' +
        '}' +
        '@media only screen and (max-width: 640px) {' +
          'body {' +
            'padding: 0 !important;'+
          '}'+
          'h1 {' +
            'font-weight: 800 !important; margin: 20px 0 5px !important;' +
          '}' +
          'h2 {' +
            'font-weight: 800 !important; margin: 20px 0 5px !important;' +
          '}'+
          'h3 {' +
            'font-weight: 800 !important; margin: 20px 0 5px !important;' +
          '}' +
          'h4 {' +
            'font-weight: 800 !important; margin: 20px 0 5px !important;' +
          '}' +
          'h1 {' +
            'font-size: 22px !important;' +
          '}' +
          'h2 {' +
            'font-size: 18px !important;' +
          '}' +
          'h3 {' +
            'font-size: 16px !important;'+
          '}'+
          '.container {'+
            'padding: 0 !important; width: 100% !important;'+
          '}'+
          '.content {'+
            'padding: 0 !important;'+
          '}'+
          '.content-wrap {'+
            'padding: 10px !important;'+
          '}'+
          '.invoice {'+
            'width: 100% !important;'+
          '}'+
        '}'+
        '</style>'+
        '</head>'+
        '<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">'+
        '<table class="body-wrap" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>'+
        		'<td class="container" width="600" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">'+
        			'<div class="content" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">'+
        				  '<table class="main" width="100%" cellpadding="0" cellspacing="0" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="alert alert-success" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 16px; vertical-align: top; color: #fff; font-weight: 500; text-align: center; border-radius: 3px 3px 0 0; background-color: SteelBlue; margin: 0; padding: 20px;" align="center" bgcolor="SteelBlue" valign="top">'+
        							'Smokey Bay Air'+
        						'</td>'+
        					'</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-wrap" style="text-align:center;font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">'+
        							'<table width="100%" cellpadding="0" cellspacing="0" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="text-align:center;font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="text-align:center;font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
        										'<img src="http://s18.postimg.org/7vaiwz4hl/Bear_Paw.jpg" height=150">'+
        										'<p>This email is a confirmation of the reservation you just made with us.  Please double check the reservations details below and edit your reservation if anything is not correct.  Please call us if you have any problems.</p>'+
        									'</td>'+
        								'</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
        									
        									'<table border="0" align="center" cellpadding="5" cellspacing="0" style="border-collapse:collapse;background-color:Wheat;color:black;font-family:arial,helvetica,sans-serif;">' +
        									  '<tbody>'+
        									    '<tr>'+
        									      '<td colspan="3" style="padding:5px;background-color:SteelBlue;color:Wheat;font-size:200%;border:5px solid SteelBlue;text-align:center;">Reservation</td>'+
        									    '</tr>'+
        									    '<tr>'+
        									      '<td style="text-align:center;border:5px solid SteelBlue;white-space:nowrap;">First Name</td>'+
        									      '<td style="border:5px solid SteelBlue;white-space:nowrap;text-align:left;font-size:125%;">'+ res.FIRST  +'</td>'+
        									    '</tr>'+
        									    '<tr>'+
        									      '<td style="text-align:center;border:5px solid SteelBlue;white-space:nowrap;">Last Name</td>'+
        									      '<td style="border:5px solid SteelBlue;white-space:nowrap;text-align:left;font-size:125%;">'+ res.LAST  +'</td>'+
        									    '</tr>'+
        									    '<tr>'+
        									      '<td style="text-align:center;border:5px solid SteelBlue;white-space:nowrap;">From</td>'+
        									      '<td style="border:5px solid SteelBlue;white-space:nowrap;text-align:left;font-size:125%;">'+ res.FROM  +'</td>'+
        									    '</tr>'+
        									    '<tr>'+
        									      '<td style="text-align:center;border:5px solid SteelBlue;white-space:nowrap;">Date</td>'+
        									      '<td style="border:5px solid SteelBlue;white-space:nowrap;text-align:left;font-size:125%;">'+ res.DATE  +'</td>'+
        									    '</tr>'+
        									    '<tr>'+
        									      '<td style="text-align:center;border:5px solid SteelBlue;white-space:nowrap;">Time</td>'+
        									      '<td style="border:5px solid SteelBlue;white-space:nowrap;text-align:left;font-size:125%;">'+ res.TIME  +'</td>'+
        									    '</tr>'+
        									  '</tbody>'+
        								  '</table>'+
        									
        										
        									'</td>'+
        								'</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
        								  '</td>'+
        								'</tr><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="content-block" style="text-align:center;font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">'+
        										'<p>Thanks for choosing Smokey Bay Air!</p><p>2100 Kachemak Dr Ste 1, Homer, AK 99603</p><p>(907) 235-1511 or (888) 482-1511</p>'+
        									'</td>'+
        								'</tr></table></td>'+
        					'</tr></table><div class="footer" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; clear: both; color: #999; margin: 0; padding: 20px;">'+
        					'<table width="100%" style="font-family: \'Helvetica Neue\,Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><tr style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;"><td class="aligncenter content-block" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; vertical-align: top; color: #999; text-align: center; margin: 0; padding: 0 0 20px;" align="center" valign="top"><a href="http://www.mailgun.com" style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 12px; color: #999; text-decoration: underline; margin: 0;"></td>'+
        						'</tr></table></div></div>'+
        		'</td><td style="font-family: \'Helvetica Neue\',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>'+
        	'</tr></table></body>'+
        '</html>';
      };
    return {
      lostPassword: function(user){
        user = user||{};
        var mailOptions = {
          to: user.email, // list of receivers
          subject: 'Smokey Bay Air Password reset' // Subject line
          
        };
        Auth.adminChangePassword(user,mailOptions);
          
      },
      
      sendEmail: function(res, resEntry, user){
        user = user||{};
        var mailOptions = {
          to: user.email, // list of receivers
          subject: 'Reservation with Smokey Bay Air', // Subject line
          text: resEntry, // plaintext body
          html: template(res) // html body
        };
        $http.post(tcFactory.api + '/api/mails/mobile', mailOptions).then(function(response) {
          //res.status = 500 for fail, 200 for success
          
        },function(response) {
          //this is a failure
          $http.put(tcFactory.api + '/api/mails/mobile', {res:resEntry,uid:user._id}).then(function(response) {
            //log an email failure
          });
        });
      },
      travelCodes:  [
        {name:"Homer to Seldovia",ref:1,time:":00"},
        {name:"Homer to Port Graham",ref:2,time:":00"},
        {name:"Homer to Nanwalek",ref:3,time:":00"},
        {name:"Seldovia to Nanwalek",ref:4,time:":15"},
        {name:"Seldovia to Port Graham",ref:5,time:":15"},
        {name:"Nanwalek to Port Graham",ref:6,time:":25"},
        {name:"Port Graham to Nanwalek",ref:7,time:":25"},
        {name:"Port Graham to Seldovia",ref:8,time:":25"},
        {name:"Nanwalek to Seldovia",ref:9,time:":25"},
        {name:"Nanwalek to Homer",ref:10,time:":25"},
        {name:"Port Graham to Homer",ref:11,time:":25"},
        {name:"Seldovia to Homer",ref:12,time:":40"}  
      ]
    }  })
    ;



