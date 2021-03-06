# validation


## 자바스크립트 선언형 검증 라이브러리
프로젝트 규모가 커지면서 폼 검증로직이 복잡해질수록, 절차적인 검증로직은 가독성면에서 복잡해지며 유지보수가 어려워집니다.  
필자는 이러한 한계를 JSON 방식의 검증 조건을 넣어주면, 자동으로 검증해주고 그 결과를 콜백 매서드로 연결시켜주는 라이브러리를 만들었습니다.


## 기본적인 사용방법

가독성이 좋지않고 반복적인 기존의 절차적인 검증방식을 탈피하기 위해 검증식을 선언하세요.  
모든 검증처리는 valiate 함수가 당신의 일을 대신 해 줄 것입니다.

    // 검증 조건 설정
    // 아래의 검증조건은 모든 검증식을 나타낸 옵션입니다.
    // 필요한 것만 취사해서 선택하시기 바랍니다.
    var condition = {
      // 샐랙터 검증 조건
      "[name=id]" : {
        empty : false,   // false일 경우 empty 체크
        checkbox : {
            checkedOne: true,       // 선택된 체크박스중 한개 이상 선택되었을 경우 
            checkedAll : true,      // 모든 체크박스가 체크되었을 때
        },
        radio : {
            selected : true         // 라디오버튼이 선택되었을 때
        },
        text : {
          min : 0,
          max : 9999
        },
        byte : {
          min : 0,
          max : 9999
        },
        number : {
          min : 0,
          max : 9999
        },
        email : true,
        url : true,
        callback : function(type, element, message) {
          // type - 검증 실패된 타입
          // text의 min 조건에서 실패된 경우 type는 text.min으로 값을 돌려줌
          // element - 실패된 엘리먼트를 리턴
          // message - 검증기에서 알려주는 메시지, 그대로 사용하지 말고 개발시 참고만 하세요.
          
        }
      },
      ....
      callback: function(type, element, message) {
        // 전역 콜백 함수
        // 샐랙터 검증 조건안에 callback을 선언하지 않은 경우 이곳으로 모든 오류 메시지가 들어오게 됩니다.
      }
    };

    var result = window.v.validate(condition);
    if(result) {
      alert("검증 완료되었습니다");
    } else {
      alert("검증 실패되었습니다");
    }



## 플러그인 추가

해당 라이브러리가 사용하긴 편하지만, 확장성이 부족하다고 생각하십니까? 결론은 그렇지 않습니다.  
해당 라이브러리는 아래와 같이 플러그인으로 구성되어 있습니다.


    // empty2 플러그인 추가
    window.v.plugin.empty2 = {
        callback : function(elements, option) {
            const condition = option;
            if(condition) {
                for(const element of elements) {
                    if(util.isEmpty(element.value)) {
                        return {
                            result : false,
                            element : element,
                            message : "비어있는 값이 발견되였습니다"
                        };
                    }
                }
            }
            return {
                result : true
            };
        }
    };

    // 실제 사용시 아래와 같이 selector 옵션에 신규 플러그인 사용
    var condition = {
      "[name=password]" : {
        empty2 : true
      }
    };

v.plugin은 루트 플러그인으로서   
이 밑에 선언된 모든 플러그인 경로는   
당신이 선언한 JSON Object의 경로와 완변하게 일치합니다.  

한번 ./src/validation-plugin.js 파일을 확인해 보세요.  

root 플러그인에 추가 및 오버라이딩이 가능하며 심지어 계층형으로 구현도 가능합니다.  
( number 플러그인을 체크해보세요. )  

## 예제
먼저 예제를 돌려보면서 도입 여부를 판단해 보세요.  

웹팩 기능을 이용하여 서버를 구동해보세요.  
터미널에서 프로젝트 root 폴더로 이동후 아래의 명령어를 입력해 보세요  

    npm start


그 후 아래의 URL로 접속해 보면 간단한 폼 페이지가 뜨게 될 것입니다.  

    http://localhost:9000/sample/login.html
    http://localhost:9000/sample/join.html


해당 소스에 대한 경로는 아래와 같습니다.  

    ./sample/validation.html 


## Github

현재 소스는 Github에서 오픈소스로 관리중입니다.  
마음껏 사용하시고 좋다 싶으면 쪼아요 눌러주세요 ^^  
상업적 목적은 추호도 없으니 재배포를 하던 떡을 치던 알아서 잘 사용하시고요~  

    https://github.com/shadowbug/validation






