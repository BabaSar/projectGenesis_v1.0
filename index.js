var textAreaDefault = document.getElementById("textArea");
textAreaDefault.value = "ADI will be generated here...";


var uriId;
var contentRefId;
var uriIdLastHalf;

//uriId is a 16 digit number
var randomSixteenDigitGenerator = function(){
    //alert("getSixteenDigitGen called!");
    //uriId = Math.floor(Math.random() * 9999999999999999 + 1000000000000000);
    //contentRefId = Math.floor(Math.random() * 9999999999999999 + 1000000000000000);
    uriId = Math.floor(Math.random() * (9999999999999999 - 1000000000000000) + 1000000000000000);
    contentRefId = Math.floor(Math.random() * (9999999999999999 - 1000000000000000) + 1000000000000000);

    var uriIdAsString = String(uriId);
    uriIdLastHalf = uriIdAsString.substr(8); //previously .substr(8,16);
};



var DateTimeFormatter = function(year, month, date, periodInDays){
    var startDateTime;
    var endDateTime;

    year = Number(year);
    month = Number(month);
    date = Number(date);
    periodInDays = Number(periodInDays);

    month = month - 1;

    startDateTime = new Date();
    endDateTime = new Date();

    //Set the UTC Year,Month,Date
    startDateTime.setUTCFullYear(year, month, date);
    endDateTime.setUTCFullYear(year, month, (date + periodInDays));

    //Set the UTC Hours,Mins,Sec
    startDateTime.setUTCHours(6,30,0,0);
    endDateTime.setUTCHours(23,55,0,0);

    //Convert to ISOString
    var startDateTimeISOString = startDateTime.toISOString().replace(/.000Z/g, "Z");
    var endDateTimeISOString = endDateTime.toISOString().replace(/.000Z/g, "Z");

    return {start: startDateTimeISOString,
        end: endDateTimeISOString};

};

var epgDateTimeFormatter = function(year, month, day, hour, minutes, seconds){

    year = Number(year);
    month = Number(month);
    day = Number(day);
    hour = Number(hour);
    minutes = Number(minutes);
    seconds = Number(seconds);

    month = month - 1;

    var epgDateTime = new Date();
    epgDateTime.setUTCFullYear(year, month, day);
    epgDateTime.setUTCHours(hour, minutes, seconds,0);

    console.log(epgDateTime);

    var epgDateTimeISOString = epgDateTime.toISOString().replace(/.000Z/g, "Z");

    return {
        dateTime: epgDateTimeISOString
    };
};

var serviceKey;

var getCutvServiceKey = function(){
    serviceKey = document.getElementById("cutvServiceKey").value;
};

var providerId = document.getElementById("providerIdTextBox").value;


var licenseDatesObject; //get these values from textboxes
var offerDatesObject;
var epgDateObject;

var getInputDataProviderID = function(){
    providerId = document.getElementById("providerIdTextBox").value; //Get new input data from providerID text box.
};

var getInputDataLicenseAndOfferDates = function(){

    //LICENSE
    var licenseYear = document.getElementById("licenseStartYear").value;
    var licenseMonth = document.getElementById("licenseStartMonth").value;
    var licenseDay = document.getElementById("licenseStartDay").value;
    var licenseDurationDays = document.getElementById("licenseDaysDuration").value;

    licenseDatesObject = DateTimeFormatter(licenseYear,licenseMonth,licenseDay,licenseDurationDays);

    //OFFER
    var offerYear = document.getElementById("offerStartYear").value;
    var offerMonth = document.getElementById("offerStartMonth").value;
    var offerDay = document.getElementById("offerStartDay").value;
    var offerDurationDays = document.getElementById("offerDaysDuration").value;

    offerDatesObject = DateTimeFormatter(offerYear,offerMonth,offerDay,offerDurationDays);

    //EPG (for CUTV)
    var epgYear = document.getElementById("epgDateTimeYear").value;
    var epgMonth = document.getElementById("epgDateTimeMonth").value;
    var epgDay = document.getElementById("epgDateTimeDay").value;
    var epgHour = document.getElementById("epgDateTimeHour").value;
    var epgMinutes = document.getElementById("epgDateTimeMinutes").value;
    var epgSeconds = document.getElementById("epgDateTimeSeconds").value;


    epgDateObject = epgDateTimeFormatter(epgYear, epgMonth, epgDay, epgHour, epgMinutes, epgSeconds);

};

var textAreaResultsGeneratorArchive = function(){
    //alert("Hello from the textAreaResultsGeneratorArchive function");

    var result = headerGenerator() +
        contentGroupGenerator() +
        titleGenerator() +
        movieGenerator() +
        previewGenerator() +
        thumbnailGenerator() +
        extPressPackGenerator() +
        offerGenerator() +
        termsGenerator() +
        footerGenerator();

    var textAreaOnClick = document.getElementById("textArea");
    textAreaOnClick.value = result;
};

var textAreaResultsGeneratorCutv = function(){

    //alert("Hello from the CUTV workflow i.e textAreaResultsGeneratorCutv function!");
    //alert("The service key you inputted is: " + serviceKey);

    var result = headerGenerator() +
        contentGroupGenerator() +
        titleGenerator() +
        movieGenerator() +
        previewGenerator() +
        thumbnailGenerator() +
        extPressPackGenerator() +
        offerGeneratorCutv() +
        termsGeneratorCutv() +
        footerGenerator();

    var textAreaOnClick = document.getElementById("textArea");
    textAreaOnClick.value = result;
};

var textAreaResultsGeneratorIPPR = function(){
    var result = headerGenerator() +
        contentGroupGenerator() +
        titleGenerator() +
        movieGenerator() +
        previewGenerator() +
        thumbnailGenerator() +
        extPressPackGenerator() +
        offerGeneratorIPPR() +
        termsGenerator() +
        footerGenerator();

    var textAreaOnClick = document.getElementById("textArea");
    textAreaOnClick.value = result;
};

var textAreaResultsGeneratorEST = function(){
    var result = headerGenerator() +
        contentGroupGenerator() +
        titleGenerator() +
        movieGenerator() +
        previewGenerator() +
        thumbnailGenerator() +
        extPressPackGenerator() +
        offerGeneratorIPPR() + //EST offer is the same as an IPPR offer
        termsGeneratorEST() +
        footerGenerator();

    var textAreaOnClick = document.getElementById("textArea");
    textAreaOnClick.value = result;
};

var generateADI = function(){
    alert("Your ADI will be generated now");
    randomSixteenDigitGenerator();
    getInputDataProviderID();
    getInputDataLicenseAndOfferDates(); //this also grabs the Cutv epgDateTime inputted by the user. epg datetime is called regardless

    var radioButtonCheckedObject = isChecked();

    if(radioButtonCheckedObject.archive === true){
        //alert("you chose archive!");
        textAreaResultsGeneratorArchive();
    }else if(radioButtonCheckedObject.cutv === true){
        //alert("You chose cutv!");
        getCutvServiceKey();
        textAreaResultsGeneratorCutv();

    }else if(radioButtonCheckedObject.ippr === true){
        //call the ippr workflow
        //alert("ippr workflow commencing...");
        textAreaResultsGeneratorIPPR();
    }else if(radioButtonCheckedObject.est === true){
        //call the est workflow
        //alert("est workflow commencing...");
        textAreaResultsGeneratorEST();
    }

};

var isChecked = function(){
    //alert("The isCheckedFunction was called!");
    var archiveRadioButtonBoolean = document.getElementById("archiveRadioButton").checked;
    var cutvRadioButtonBoolean = document.getElementById("cutvRadioButton").checked;
    var ipprRadioButtonBoolean = document.getElementById("ipprRadioButton").checked;
    var estRadioButtonBoolean = document.getElementById("estRadioButton").checked;

    return {archive: archiveRadioButtonBoolean,
        cutv: cutvRadioButtonBoolean,
        ippr: ipprRadioButtonBoolean,
        est: estRadioButtonBoolean};


};

function generateRandomEpgDateTime(){
    var year = Math.floor(Math.random()*6 + 2008);
    //generates a random year between 2008 and 2016

    var month = Math.floor(Math.random()*12 + 1);
    //generates a random number between 1 and 12

    var day = Math.floor(Math.random()*20 + 1);
    //generates a random number between 1 and 20

    var hour = Math.floor(Math.random()*24);
    //generates a random number between 0 and 24

    var minutes = Math.floor(Math.random()*60);
    //generates a random number between 0 and 60

    var seconds = Math.floor(Math.random()*60);
    //generates a random number between 0 and 60

    return {
        epgYear : year,
        epgMonth : month,
        epgDay : day,
        epgHour : hour,
        epgMinutes : minutes,
        epgSeconds : seconds

    };

};

var randomizeEpg = function(){
    var EpgObject = generateRandomEpgDateTime(); //get the random values generated

    //grab the elements by their id
    var year = document.getElementById("epgDateTimeYear");
    var month = document.getElementById("epgDateTimeMonth");
    var day = document.getElementById("epgDateTimeDay");
    var hour = document.getElementById("epgDateTimeHour");
    var minutes = document.getElementById("epgDateTimeMinutes");
    var seconds = document.getElementById("epgDateTimeSeconds");

    //assign the newly generated values to the text boxes, so the user can see it
    year.value = EpgObject.epgYear;
    month.value = EpgObject.epgMonth;
    day.value = EpgObject.epgDay;
    hour.value = EpgObject.epgHour;
    minutes.value = EpgObject.epgMinutes;
    seconds.value = EpgObject.epgSeconds;

};




var generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", generateADI); //Waits for the generate button to be clicked, then calls generate()

var randomizeEpgDateTimeButton = document.getElementById("randomizeEpgButton");
randomizeEpgDateTimeButton.addEventListener("click", randomizeEpg);



// -------------- ADI BLOCKS GENERATORS BELOW --------------------- //
//----------------------------------------------------------------- //


var textProcessor = function(string){
    var string1 = string.replace(/@ProviderId@/g, providerId);
    var string2 = string1.replace(/@UriId@/g, uriId);
    var string3 = string2.replace(/@UriIdLastHalf@/g, uriIdLastHalf);
    var string4 = string3.replace(/@contentRefId@/g, contentRefId);
    var string5 = string4.replace(/@licenseStart@/g, licenseDatesObject.start);
    var string6 = string5.replace(/@licenseEnd@/g, licenseDatesObject.end);
    var string7 = string6.replace(/@offerStart@/g, offerDatesObject.start);
    var string8 = string7.replace(/@offerEnd@/g, offerDatesObject.end);
    var string9 = string8.replace(/@epgDateTime@/g, epgDateObject.dateTime);
    var string10 = string9.replace(/@cutvServiceKey@/g, serviceKey);

    //need to add text processing for Offer start and end also.

    return String(string10);
};

var headerGenerator = function(){

    var header = '<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>' + '\n' +
        '<ADI3 xmlns=\"http://www.cablelabs.com/namespaces/metadata/xsd/vod30/1\" ' +
        'xmlns:content=\"http://www.cablelabs.com/namespaces/metadata/xsd/content/1\" xmlns:core=\"http://www.cablelabs.com/namespaces/metadata/xsd/core/1\" ' +
        'xmlns:offer=\"http://www.cablelabs.com/namespaces/metadata/xsd/offer/1\" xmlns:terms=\"http://www.cablelabs.com/namespaces/metadata/xsd/terms/1\" ' +
        'xmlns:title=\"http://www.cablelabs.com/namespaces/metadata/xsd/title/1\" xmlns:ext=\"URN:NNDS:CMS:ADI3:01\" xmlns:PO=\"URN:NNDS:CMS:ADI3:PURCHASEOPTIONS:01\" ' +
        'xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:schemaLocation=\"http://www.cablelabs.com/namespaces/metadata/xsd/vod30/1 ./MD-SP-VODContainer-I01.xsd\">' + '\n';

    return header;
};

var contentGroupGenerator = function(){
    var contentGroup = '\t<ContentGroup uriId="@ProviderId@/CGVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:ContentGroupType>AV</ext:ContentGroupType>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<offer:TitleRef uriId="@ProviderId@/TITL@UriId@" />\n' +
        '\t\t<offer:PreviewRef uriId="@ProviderId@/TRVT@UriId@" />\n' +
        '\t\t<offer:ThumbnailRef uriId="@ProviderId@/THVT@UriId@" />\n' +
        '\t\t<offer:ContentRef uriId="@ProviderId@/CGPP@contentRefId@" />\n' +
        '\t\t<offer:MovieRef uriId="@ProviderId@/MAIN@UriId@" />\n' +
        '\t</ContentGroup>\n';

    contentGroup += '\t<ContentGroup uriId="@ProviderId@/CGPP@contentRefId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:PressPackImageRef uriId="@ProviderId@/PPAP@UriId@" />\n' +
        '\t\t\t<ext:PressPackImageRef uriId="@ProviderId@/PPAP@contentRefId@" />\n' +
        '\t\t\t<ext:ContentGroupType>AV</ext:ContentGroupType>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<offer:TitleRef uriId="@ProviderId@/TITL@UriId@" />\n' +
        '\t</ContentGroup>\n';

    var replaced = textProcessor(contentGroup);

    return replaced;
};

var titleGenerator = function(){
    var title = '\t<Title uriId="@ProviderId@/TITL@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:LocalizableTitleExt xml:lang="eng">\n' +
        '\t\t\t\t<ext:MarketingMessage>@ProviderId@-@UriIdLastHalf@ MarketingMessage</ext:MarketingMessage>\n' +
        '\t\t\t</ext:LocalizableTitleExt>\n' +
        '\t\t\t<ext:IsSigned>false</ext:IsSigned>\n' +
        '\t\t\t<ext:IsSubtitle>false</ext:IsSubtitle>\n' +
        '\t\t\t<ext:IsAudioDescribed>false</ext:IsAudioDescribed>\n' +
        '\t\t\t<ext:Soundmouse>1166269</ext:Soundmouse>\n' +
        '\t\t\t<ext:StudioCode>1</ext:StudioCode>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<title:LocalizableTitle xml:lang="eng">\n' +
        '\t\t\t<title:TitleSortName>*</title:TitleSortName>\n' +
        '\t\t\t<title:TitleBrief>BS@UriIdLastHalf@</title:TitleBrief>\n' +
        '\t\t\t<title:TitleMedium>@ProviderId@-@UriIdLastHalf@</title:TitleMedium>\n' +
        '\t\t\t<title:TitleLong>BS@UriIdLastHalf@</title:TitleLong>\n' +
        '\t\t\t<title:SummaryShort>@ProviderId@-CGVT@UriId@</title:SummaryShort>\n' +
        '\t\t\t<title:ActorDisplay> "Jim Carrey, Will Ferrell, Jeff Daniels, Liam Neeson, Morgan Freeman, Jonah Hill" </title:ActorDisplay>\n' +
        '\t\t\t<title:Actor firstName="Jim" lastName="Carrey" fullName="Jim Carrey" />\n' +
        '\t\t\t<title:Actor firstName="Will" lastName="Ferrell" fullName="Will Ferrell" />\n' +
        '\t\t\t<title:Actor firstName="Baba" lastName="Sariffodeen" fullName="Baba Sariffodeen" />\n' +
        '\t\t\t<title:DirectorDisplay> "Raphael Cohen" </title:DirectorDisplay>\n' +
        '\t\t\t<title:Director firstName="Raphael" lastName="Cohen" fullName="Raphael Cohen" />\n' +
        '\t\t\t<title:StudioDisplay> "Warner Brothers Int TV" </title:StudioDisplay>\n' +
        '\t\t</title:LocalizableTitle>\n' +
        '\t\t<title:Rating ratingSystem="BSkyBca">1</title:Rating>\n' +
        '\t\t<title:Rating ratingSystem="BSkyBsi">1</title:Rating>\n' +
        '\t\t<title:Rating ratingSystem="BSkyBtc">SU</title:Rating>\n' +
        '\t\t<title:Advisory>private:FLASH</title:Advisory>\n' +
        '\t\t<title:DisplayRunTime>1:30:00</title:DisplayRunTime>\n' +
        '\t\t<title:Year>2015</title:Year>\n' +
        '\t\t<title:Genre>3:1</title:Genre>\n' +
        '\t\t<title:ShowType>Other</title:ShowType>\n' +
        '\t</Title>\n';

    var replaced = textProcessor(title);

    return replaced;
};

var movieGenerator = function(){
    var movie = '\t<Movie uriId="@ProviderId@/MAIN@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t<content:SourceUrl>Providers/BSS/Content/Distribution/TestFiles/Promo30s-1-THD-CP.ts</content:SourceUrl>\n' +
        '\t\t<content:ContentFileSize>1</content:ContentFileSize>\n' +
        '\t\t<content:ContentCheckSum>1ADE2D591836B088C77D42EB6B7629DE</content:ContentCheckSum>\n' +
        '\t\t<content:AudioType>Dolby 5.1</content:AudioType>\n' +
        '\t\t<content:ScreenFormat>Widescreen</content:ScreenFormat>\n' +
        '\t\t<content:Resolution>1080i</content:Resolution>\n' +
        '\t\t<content:FrameRate>25</content:FrameRate>\n' +
        '\t\t<content:Duration>PT1H30M00S</content:Duration>\n' +
        '\t\t<content:IsHDContent>true</content:IsHDContent>\n' +
        '\t\t<content:Language>eng</content:Language>\n' +
        '\t\t<content:CopyControlInfo>\n' +
        '\t\t\t<content:IsCopyProtectionVerbose>true</content:IsCopyProtectionVerbose>\n' +
        '\t\t\t<content:AnalogProtectionSystem>0</content:AnalogProtectionSystem>\n' +
        '\t\t\t<content:EncryptionModeIndicator>0</content:EncryptionModeIndicator>\n' +
        '\t\t\t<content:ConstrainedImageTrigger>0</content:ConstrainedImageTrigger>\n' +
        '\t\t\t<content:CGMS_A>3</content:CGMS_A>\n' +
        '\t\t</content:CopyControlInfo>\n' +
        '\t</Movie>\n';

    var processed = textProcessor(movie);

    return processed;

};

var previewGenerator = function(){
    var preview = '\t<Preview uriId="@ProviderId@/TRVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:PreviewExtensions mediaId="03175259">\n' +
        '\t\t\t\t<ext:closedCaption>false</ext:closedCaption>\n' +
        '\t\t\t\t<ext:promoTitle>Trailer</ext:promoTitle>\n' +
        '\t\t\t</ext:PreviewExtensions>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<content:SourceUrl>Providers/BSS/Content/Distribution/TestFiles/Promo30s-1-THD-CP.ts</content:SourceUrl>\n' +
        '\t\t<content:ContentFileSize>1</content:ContentFileSize>\n' +
        '\t\t<content:ContentCheckSum>1ADE2D591836B088C77D42EB6B7629DE</content:ContentCheckSum>\n' +
        '\t\t<content:AudioType>Dolby 5.1</content:AudioType>\n' +
        '\t\t<content:Duration>PT00H02M00S</content:Duration>\n' +
        '\t\t<content:IsHDContent>true</content:IsHDContent>\n' +
        '\t\t<content:Language>eng</content:Language>\n' +
        '\t\t<content:Rating ratingSystem="BSkyBsi">0</content:Rating>\n' +
        '\t</Preview>\n';

    var processed = textProcessor(preview);

    return processed;

};

var thumbnailGenerator = function(){
    var thumbnail = '\t<Thumbnail uriId="@ProviderId@/THVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t<content:SourceUrl>tank/Images/Godzilla-pa.jpg</content:SourceUrl>\n' +
        '\t\t<content:ContentFileSize>11486</content:ContentFileSize>\n' +
        '\t\t<content:ContentCheckSum>cd0c3bd1a419d09b087229a2911f22c8</content:ContentCheckSum>\n' +
        '\t\t<content:Language>eng</content:Language>\n' +
        '\t</Thumbnail>\n';

    var processed = textProcessor(thumbnail);

    return processed;

};

var extPressPackGenerator = function(){
    var extPressPack = '\t<Ext>\n' +
        '\t\t<ext:PressPackImage uriId="@ProviderId@/PPAP@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t\t<content:SourceUrl>tank/Images/Godzilla-pa.jpg</content:SourceUrl>\n' +
        '\t\t\t<content:ContentFileSize>11486</content:ContentFileSize>\n' +
        '\t\t\t<content:ContentCheckSum>cd0c3bd1a419d09b087229a2911f22c8</content:ContentCheckSum>\n' +
        '\t\t\t<content:X_Resolution>896</content:X_Resolution>\n' +
        '\t\t\t<content:Y_Resolution>1280</content:Y_Resolution>\n' +
        '\t\t\t<content:Language>eng</content:Language>\n' +
        '\t\t\t<content:Usage>urn:nnds:Metro:metadata:MediaTypeCS:2007:2.6</content:Usage>\n' +
        '\t\t</ext:PressPackImage>\n' +
        '\t\t<ext:PressPackImage uriId="@ProviderId@/PPAP@contentRefId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@licenseStart@" endDateTime="@licenseEnd@">\n' +
        '\t\t\t<content:SourceUrl>tank/Images/Godzilla-pa.jpg</content:SourceUrl>\n' +
        '\t\t\t<content:ContentFileSize>11486</content:ContentFileSize>\n' +
        '\t\t\t<content:ContentCheckSum>cd0c3bd1a419d09b087229a2911f22c8</content:ContentCheckSum>\n' +
        '\t\t\t<content:X_Resolution>896</content:X_Resolution>\n' +
        '\t\t\t<content:Y_Resolution>1280</content:Y_Resolution>\n' +
        '\t\t\t<content:Language>eng</content:Language>\n' +
        '\t\t</ext:PressPackImage>\n' +
        '\t</Ext>\n';

    var processed = textProcessor(extPressPack);

    return processed;

};

var offerGenerator = function(){
    var offer = '\t<Offer uriId="@ProviderId@/OAVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@offerStart@" endDateTime="@offerEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:OfferAvailability offerType="SVOD" startDateTime="@offerStart@" endDateTime="@offerEnd@" />\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<offer:ProviderContentTier>@ProviderId@</offer:ProviderContentTier>\n' +
        '\t\t<offer:BillingId>DUMMY</offer:BillingId>\n' +
        '\t\t<offer:TermsRef uriId="@ProviderId@/TAVT@UriId@" />\n' +
        '\t\t<offer:ContentGroupRef uriId="@ProviderId@/CGVT@UriId@" />\n' +
        '\t</Offer>\n';

    var processed = textProcessor(offer);

    return processed;
};

var offerGeneratorIPPR = function(){
    var offer = '\t<Offer uriId="@ProviderId@/OAVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@offerStart@" endDateTime="@offerEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:OfferAvailability offerType="IPPR" startDateTime="@offerStart@" endDateTime="@offerEnd@" />\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<offer:ProviderContentTier>@ProviderId@</offer:ProviderContentTier>\n' +
        '\t\t<offer:BillingId>DUMMY</offer:BillingId>\n' +
        '\t\t<offer:TermsRef uriId="@ProviderId@/TAVT@UriId@" />\n' +
        '\t\t<offer:ContentGroupRef uriId="@ProviderId@/CGVT@UriId@" />\n' +
        '\t</Offer>\n';

    //the terms for IPPR is the same as the terms for Archive

    var processed = textProcessor(offer);

    return processed;
};

var offerGeneratorCutv = function(){
    var offer = '\t<Offer uriId="@ProviderId@/OAVT@UriId@" providerVersionNum="1" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@offerStart@" endDateTime="@offerEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:CutvEvent epgDateTime="@epgDateTime@" leadServiceKey="@cutvServiceKey@">\n' +
        '\t\t\t\t<ext:Service serviceKey="@cutvServiceKey@" />\n' +
        '\t\t\t</ext:CutvEvent>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<offer:ProviderContentTier>@ProviderId@</offer:ProviderContentTier>\n' +
        '\t\t<offer:BillingId>DUMMY</offer:BillingId>\n' +
        '\t\t<offer:TermsRef uriId="@ProviderId@/TAVT@UriId@" />\n' +
        '\t\t<offer:ContentGroupRef uriId="@ProviderId@/CGVT@UriId@" />\n' +
        '\t</Offer>\n';

    var processed = textProcessor(offer);

    return processed;
};

var termsGenerator = function(){
    var terms = '\t<Terms uriId="@ProviderId@/TAVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@offerStart@" endDateTime="@offerEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:TermType>Archive</ext:TermType>\n' +
        '\t\t\t<ext:platform>VT</ext:platform>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<terms:SuggestedPrice>0</terms:SuggestedPrice>\n' +
        '\t</Terms>\n';

    var processed = textProcessor(terms);

    return processed;
};

var termsGeneratorCutv = function(){
    var terms = '\t<Terms uriId="@ProviderId@/TAVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@offerStart@" endDateTime="@offerEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:TermType>CUTV</ext:TermType>\n' +
        '\t\t\t<ext:platform>VT</ext:platform>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<terms:SuggestedPrice>0</terms:SuggestedPrice>\n' +
        '\t</Terms>\n';

    var processed = textProcessor(terms);

    return processed;
};

var termsGeneratorEST = function(){
    var terms = '\t<Terms uriId="@ProviderId@/TAVT@UriId@" providerVersionNum="0" internalVersionNum="0" creationDateTime="@licenseStart@" startDateTime="@offerStart@" endDateTime="@offerEnd@">\n' +
        '\t\t<core:Ext>\n' +
        '\t\t\t<ext:TermType>Archive</ext:TermType>\n' +
        '\t\t\t<ext:platform>ES</ext:platform>\n' +
        '\t\t</core:Ext>\n' +
        '\t\t<terms:SuggestedPrice>0</terms:SuggestedPrice>\n' +
        '\t</Terms>\n';

    var processed = textProcessor(terms);

    return processed;
};

var footerGenerator = function(){
    var footer = '</ADI3>';

    return footer;
};