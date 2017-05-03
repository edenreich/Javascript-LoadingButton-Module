<p align="center"><img src="https://s17.postimg.org/u6scw9ben/buttons.jpg"></p>

# Javascript-LoadingButton-Module
This is a nice looking loading button.

### Import the script
All you need is just the LoadingButton.js, download it and add it to your assets folder and link it to your view page.

### Instatiate a new LoadingButton Object
Create a new instance of Loading Button and assign it to a variable like so:
```javascript
var button = new LoadingButton;
```
### Configuration
Use the following setting to configure the look of your button however you want
```javascript
button.settings({
			progressColor: '#0CA4E8',
			bindToElementById: 'button',
			buttonColor: '#0D76FF',
			buttonWidth: '300px',
			buttonHeight: '100px',
			checkMarkColor: '#0DFF84',
			xMarkColor: 'red',
			fontSize: '36px',
			fontColor: '#ffffff',
			backToOriginalState: true,
});
```

please note that if you do not give an specific bindToElementById options the object will bind it to the first button it finds on the DOM.

### Events
you can use onclick event like so:
```javascript
button.onclick(function() {
  // the button will start loading state automaticly so you will need to stop it based appond the tasks if fails or succeed.
});
```
you can stop the loading like so:
```javascript
button.onclick(function() {
  // sending some ajax request etc..
  // if ajax response failed
    button.stop('failed');
  // if ajax response succeed
    button.stop('success');
});
```
## Notes
please feel free to send any pull request or suggesstions to improve it :-) 

