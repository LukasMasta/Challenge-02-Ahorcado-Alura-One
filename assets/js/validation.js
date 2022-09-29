export default function validation (text,option){
     if(option==0){
        let myRegExp= /^[A-Za-z\n\u00f1\u00d1]\r*$/
        if( myRegExp.test(text)){
            return true;
        }
        else{
            return false;
        } 
    }
    else{
        let myRegExp= /^[A-Za-z\n\u00f1\u00d1]*$/
        if( myRegExp.test(text)){
            return true;
        }
        else{
            return false;
        }
    }  
}