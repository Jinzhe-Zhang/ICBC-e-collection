import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.StringTokenizer;

import com.icbc.api.response.BasFaceFacesaddResponseV1;
import com.icbc.api.request.BasFaceFacesaddRequestV1;
import com.icbc.api.request.BasFaceFacesaddRequestV1.BasFaceFacesaddRequestV1Biz;
import com.icbc.api.DefaultIcbcClient;
import com.icbc.api.UiIcbcClient;
import com.icbc.api.IcbcApiException;
import com.icbc.api.IcbcConstants;
import com.icbc.api.request.QrcodeGenerateRequestV2;
import com.icbc.api.request.QrcodeGenerateRequestV2.QrcodeGenerateRequestV2Biz;
import com.icbc.api.response.QrcodeGenerateResponseV2;
import com.icbc.api.request.QrcodePayRequestV2;
import com.icbc.api.request.QrcodePayRequestV2.QrcodePayRequestV2Biz;
import com.icbc.api.response.QrcodePayResponseV2;

import net.sf.json.JSONObject;

class Account{
	Socket client;
	String outtradeno;
	String qrcode;
	String content;
	Boolean issuccess=false;
	Boolean sellervisit=false;
	Boolean buyervisit=false;
	static int begin=0;
	static int end=0;
	Account(Socket client, String content,String qrcode){
		this.client=client;
		this.outtradeno=content;
		this.qrcode=qrcode;
	}
	public Boolean equal(Account other) {
		return client.getInetAddress()==other.client.getInetAddress() && outtradeno==other.outtradeno && qrcode==other.qrcode; 
	}
	public Boolean equal(Socket client,String content) {
		return this.client.getInetAddress().equals(client.getInetAddress()) && this.outtradeno.equals(content);
	}
	public Boolean equal(String content) {
		return this.outtradeno.equals(content);
	}
}
public class Mypro {
	////////////
	final static String APP_ID = "IICAMP0000000876";
	protected static final String MY_PRIVATE_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFP7vNu+Q06BZvU0Z7XdXGQVQAjCFLGJhVBO+1OBhN7lzQxBj5bmmOUo8Vdf7h/HJT93Wfw6GyFodSKFPLEK4H57U9oXaFRxDHJ8UecvruK5FPjcPRj+Q+PDRVkLFLL+cONgX87onhrxeG3LGM8TsbCyDACYlajRDgnBfCdMMNw34eaeA4cSPhlQPlZMK7zIwFwbbvZuUZSE4JvP6FXRgaVLJfVyGLpsFa22eTsjV0DnkQr5yEvI//cMSzINJZ30mahSzqerPYioIJlyASQ/lGfzHwFeoT+Cfaa5k7HgZ/CRV9NuAZ0J/9X6nVoGqm/KnUucgPcX8n8/2rxnuax+CrAgMBAAECggEAYVQiW65IjJSR/pL3QplR0tRZBWVV1EKM0l0esmHc7t+TEDKMg3UwyPJo7SYZHPyGjeqNEjuVWj22bj5ipkrys3d+HRxZNBSqnq3f/9PAkkNkipVkWSgfcY4MNAvSVLcSsICpcwzRzfVU2/9L+UUjBSflrh/JIkkz8LxTZohfCSeX5m+cTB/bxSlxuVBiW60UfZk96wKJv/iXg2wL/1bFHcvj52435qTEjtf1kba7qStCYBOIzhga2JUF0cAO+nLsG7kJd5Cop8y1BpICy6NMN7V8fQFE6KZd+nL+Z1qrcQQ6r9QKUmmZihix9B7X/QBIkaRb8A3/Kzo/K/USgya3EQKBgQDU5cpxfWCoLXujBscDV2o8s+g+sUNyKptkTMPdS4QBLetBUzJeMbuncfiEiyYBgWlTEGQpXattimNLwJEsDLDrniM0qfOWd0mfHLbdQh/vNRlAFYGhXX95khavkmXjKXognX1r+j21riu5Bosq1oaAN/hIwwTS/SPwtO5bKnhJzwKBgQCgOdr7Xniw+9QIq1n4nQqzdZXE1/Bytzd9CdLabJWAW6bbhq7N9Op5dLUg88D1BqQaSwEUD0khxN/125DwnK6rQiTppjihB65R2oRK6VmSXiQXNgc4Q2lh9v80POQPjIkmgFj6alC93CYRcpf1xO4jRSzPDbzcoiAop3W+6iueZQKBgCITrfXAdco1jYaovQ4h3dVdjp0KTptlin3hc7BmN/jgWrmYEYXWPA0vRvIgO7Md/bfX9dBRN/FOp1omtpXwahkstMHnOiApc9VOCU8dGHN3clU5nAgyKQdShOMRcdGMgAnca4jvAxWjjUgObhQrRlgbnVg4Lvt+nVQYAdcB00MtAoGAdvl++Zi01fapA6b5L/qsr4VoqLoP+Z7CvT5GK5rliGKGDAx+UMDEO1vGA6n8ZfWAdWWsb1DKZSDjjJR1k7VEnjaHYlfjRO+HKZCxG08bC+yLsBCWW9jyr6PQ7OEqF8GrNcOoTooTWmfWfK4y2HRawCXll/oDe3GHn6h5bkJEEWECgYEAnBYenulDR+El29Qg36AYyCL83v7vaOUjZbByYJiuFyMcqhvsZsVOKStBm3D7FF9vNNTV292hnfTwkRRC+tuo7SUfNpazFOdMfcuFyzVGgauBgbyZeRglPrwRBpPG0/B8i2AnFcka1T1YadWIN2CGujVNMgujqPZQ21ABw/1vAaA=" ;
//	final static String APIGW_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhT+7zbvkNOgWb1NGe13VxkFUAIwhSxiYVQTvtTgYTe5c0MQY+W5pjlKPFXX+4fxyU/d1n8OhshaHUihTyxCuB+e1PaF2hUcQxyfFHnL67iuRT43D0Y/kPjw0VZCxSy/nDjYF/O6J4a8XhtyxjPE7GwsgwAmJWo0Q4JwXwnTDDcN+HmngOHEj4ZUD5WTCu8yMBcG272blGUhOCbz+hV0YGlSyX1chi6bBWttnk7I1dA55EK+chLyP/3DEsyDSWd9JmoUs6nqz2IqCCZcgEkP5Rn8x8BXqE/gn2muZOx4GfwkVfTbgGdCf/V+p1aBqpvyp1LnID3F/J/P9q8Z7msfgqwIDAQAB";
//    final static String APP_ID = "IICAMP0000000046";
//    protected static final String MY_PRIVATE_KEY = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2m4Wm4WGutOIhSaSA27n9bYdm4c/ZzRMt/R8okFIU2BvKRgSkOE8gaAV27aIfUdYZjBTdeGilPyiP9MQMyB0CkT6r72xUT0EDjj9Rll10L4GxSdt3zeCmfKSPN2L87uxoOkSLzVMBiNfWoQ2gj89nCMs+pK9pxCjgv0LNso01If7U+GSZc5pE5Livg9Y3+cXH1QJv4UdEoJyiQwugkCGPRMEbPUeczCq0YYlYF4aAJoUdvxVbm/Z75yZ6UZmFfWlSkePjkZxnC6jytq+SZLpR0hgXMNxsW1WNV1xabbKdq0mSK5RN2ahwIcereJEo9HMbFGYOlQIRPNhc3lkKlBZ1AgMBAAECggEAKf4jwxerXgDMy7jisptU7xmj/J3LLZwCYB4Ib0yZA6Aa6+4kHRux3pLtRsco9CjeomtbVP7embmne0tfVk0ilreOAP4DHHRJUCcDGqEIhrJyEbIZXTikA8VAFos3IVFUXjegEcI652xvrjTFLHpFyLz1+Ebo69qnR9/T3ffEj0YJjB/3kHNVe5bLiGC7iUCN7vzH06FeNI6lp4fe9c3zvOOovzSv7NRpvTYWUG4bL8UmBHZTTFzVfUCeqR9CTqcsst3K9U7gPkF74g7uU8Qu6bt7pmxZNuNxeKUuyaSq3rzo9Zqy/Dg9KC00xEKspUeJUKpKoXhA5GracXwplPVDIQKBgQDhWjJCiv9ckFERF7QotXYhe8Xg3/vtFDWvvpJ19K38Usnl4kdet7SqoNYUCdAgTqewmyLbFHWAWXwNiZocfDuQQNaY6nGpi4IWFWpAaG/xnau3nDZOcGGy/WryqRihmpd4+gQJiBJgCs5cYnFaGB4bXgxtTz48kLvSv1GB0rL7bQKBgQDPcSJOSBcW6PmE683G2oS+JBhkS01T+TKlcTGE4KTq8SxNERYhZj/mpVLm6wm6g+g3bYZEutMPuQihKFTGISpq+weUxtkoU/3b+yngq9drkcesBRgVOZK54gHKjSTRFfhJBKskQwgHLbCOROBEZpkL0se919XJ49gP2jb9sKvaKQKBgEBfhJXvoMyvSQkJ7WPnmiwscDUxpoRtznw6gxoA4CaA+72YauzKq2hGc4Db4MEp1ssjNczBRmN4rHAti4Fxl444h1S9O+TDvlBSo7xsWPX7JU9Y50Z24eHAdGmHFksrnvNm7/pNDXqz+4j2cgzbcNY+gmxDQ7MHYS/tiPn91zTtAoGABK9BXxMxskrAl8fbdcophUG7a0hoDqVqB2JvA9ku4D9iCLuCDG8KsmK5ZI2aQqQH8nh+t76gVZKQJ1OJ1o+ZLaFNooZ7EPYUnYsmfvRigQNhxvi2eoQ6VAhOkgxt8GrWmI+Kbd81pzPY8N2NUv4eJq4z5I2jPlPu5SzAYSpEN0ECgYBTwMS0MZcS+IG/A52cCM3uho1Z5PaNonavXnA6M26WSQjIHQmldaG2FAJ/b78gEMCLaO9iXTbnyOQkZDKJ1bQNR9Lt9LcoKj/SeRGHT6BP2nf6dE3sBxf8aKE1EfGKaxwayxgey6niqhJVfT91remo9sN0Pp3sCIh1E1p9xqXuXQ==" ;
    final static String APIGW_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwFgHD4kzEVPdOj03ctKM7KV+16bWZ5BMNgvEeuEQwfQYkRVwI9HFOGkwNTMn5hiJXHnlXYCX+zp5r6R52MY0O7BsTCLT7aHaxsANsvI9ABGx3OaTVlPB59M6GPbJh0uXvio0m1r/lTW3Z60RU6Q3oid/rNhP3CiNgg0W6O3AGqwIDAQAB";
	protected static SimpleDateFormat sdf1 = new SimpleDateFormat("yyyyMMdd");  
	protected static SimpleDateFormat sdf2 = new SimpleDateFormat("HHmmss"); 
	//////////
	private static ServerSocket serverSocket= null;
	private static OutputStream os = null;
	private static PrintWriter pw = null;
	private static int count = 0;
	private static Account[] buffer = new Account[100];
    public static void run() {
    	String content = "";
    	System.out.println("Begin!    Listening...");
        while(true) {
            try {
                Socket client=null;//客户Socket
                int contentLength = 0;// 客户端发送的 HTTP 请求的主体的长度
                client=serverSocket.accept();//客户机(这里是 IE 等浏览器)已经连接到当前服务器
                if(client!=null) {
                    System.out.println("连接到服务器的用户:"+client);
                    try {
                        // 第一阶段: 打开输入流
                        BufferedReader in=new BufferedReader(new InputStreamReader(
                                client.getInputStream()));
                        System.out.println("客户端发送的请求信息:\n===================");
                        // 读取第一行, 请求地址
                        String line=in.readLine();
                        System.out.println(line);
                        String resource=line.substring(line.indexOf('/'),line.lastIndexOf('/')-5);
                        //获得请求的资源的地址
                        resource=URLDecoder.decode(resource, "UTF-8");//反编码 URL 地址
                        String method = new StringTokenizer(line).nextElement().toString();// 获取请求方法, GET 或者 POST

                        //System.out.println("\nresource "+resource);
                        //System.out.println("method "+method);
                        // 读取所有浏览器发送过来的请求参数头部信息
                        while( (line = in.readLine()) != null) {
                            System.out.println(line);


                            // 读取 POST 等数据的内容长度
                            if(line.startsWith("content-length") || line.startsWith("Content-Length")) {
                                try {
                                    contentLength = Integer.parseInt(line.substring(line.indexOf(':') + 1).trim());
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }


                            if(line.equals("")) break;
                        }

                        // 显示 POST 表单提交的内容, 这个内容位于请求的主体部分
                        if("POST".equalsIgnoreCase(method) && contentLength > 0) {
                        	//System.out.println("以下内容为 POST 方式提交的表单数据");
                            content="";
                            {char c; 
                                for(int i = 0; i < contentLength; i++) {
                                	c=(char)in.read();
                                	content+=c;
                                	if((int)c>255) {
                                		i+=2;
                                	}
                                }
                            }
                            System.out.println(content);
                            JSONObject jsonObject = JSONObject.fromObject(content);
                            DefaultIcbcClient ICBCclient = new DefaultIcbcClient(APP_ID,MY_PRIVATE_KEY, APIGW_PUBLIC_KEY);//!!
                            int flag=-1;
if(resource.equals("/qrcode")) {
						if(jsonObject.getString("confirm").equals("yes")) {
							flag=-2;
						for(int i=Account.begin;i<Account.end;i++) {
							System.out.println(client+ jsonObject.getString("out_trade_no")+"  haha   "+buffer[i%100].client+buffer[i%100].outtradeno);
							if(buffer[i%100].equal(client, jsonObject.getString("out_trade_no"))) {
								flag=i%100;
								break;
							}
						}
						}
						if(flag==-1) {
						
						    QrcodeGenerateRequestV2 request = new QrcodeGenerateRequestV2();
						    //request.setServiceUrl("https://gw-api-iicamp.dccnet.com.cn/api/qrcode/V2/generate");
						    request.setServiceUrl("https://apisandbox.dccnet.com.cn/api/qrcode/V2/generate");
                            Calendar calendar = Calendar.getInstance();  
                            java.util.Date date = calendar.getTime();   
                            QrcodeGenerateRequestV2Biz bizContent = new QrcodeGenerateRequestV2Biz();
                    		bizContent.setMerId(jsonObject.getString("mer_id"));
                    		bizContent.setStoreCode(jsonObject.getString("store_code"));
                    		bizContent.setOutTradeNo(jsonObject.getString("out_trade_no"));
                    		bizContent.setOrderAmt(jsonObject.getString("order_amt"));
                    		bizContent.setTradeDate(sdf1.format(date));
                    		bizContent.setTradeTime(sdf2.format(date));
                    		bizContent.setAttach(jsonObject.getString("attach"));
                    		bizContent.setPayExpire("1200");
                    		//bizContent.setNotifyUrl("127.0.0.1");//该字段非必输项
                    		bizContent.setTporderCreateIp("127.0.0.1");
                    		bizContent.setSpFlag("0");//该字段非必输项
                    		bizContent.setNotifyFlag("0");
                    		request.setBizContent(bizContent);
                    		
                    		QrcodeGenerateResponseV2 response = new QrcodeGenerateResponseV2();
                    		try {
                    			response = ICBCclient.execute(request, "msgId");//msgId消息通讯唯一编号，要求每次调用独立生成，APP级唯一
                    			String jsonRsp;
                    			os=client.getOutputStream();
                                pw=new PrintWriter(os);
                                pw.println("HTTP/1.0 200 OK");//返回应答消息,并结束应答
                                pw.println("Content-Type:text/html;charset=UTF-8;");
                                pw.println("Access-Control-Allow-Origin:*");
                                pw.println();// 根据 HTTP 协议, 空行将结束头信息
                    			if (response.isSuccess()) {
                    				buffer[Account.end]=new Account(client,jsonObject.getString("out_trade_no"),response.getQrcode());
                    				Account.end++;
                    				System.out.println(response.getAttach());
                    				//6、业务成功处理，请根据接口文档用response.getxxx()获取同步返回的业务数据
                    				System.out.println("ReturnCode:"+response.getReturnCode());
                    				System.out.println("response:" + response);
                    				//{"return_code":"0","return_msg":"-","msg_id":"urcnl24ciutr9","qrcode":"示例值详见响应示例","attch":"-"}
                    				jsonRsp="{"
                    						+"\"return_code\":\""+response.getReturnCode()+"\","
                    						+"\"return_msg\":\""+response.getReturnMsg()+"\","
                                    		+"\"msg_id\":\""+response.getMsgId()+"\","
                                    		+"\"qrcode\":\""+response.getQrcode()+"\","
                                    		//+"\"qrcode\":\""+"https://wechat49b2c.dccnet.com.cn/servlet/wcqr?f=ICBCqr&X=1&T=3&P=6&I=dda5a8c6c91e455b&N=6ffca517a6b68febc5cf2a7d95d8fdfb&L=4e77298cf75dea0b2a4e7d6f4865f05255cc0cba5e2efab54c456c3de034f6cf6c68b5a8ab099529"+"\","
                                    		+"\"attach\":\""+response.getAttach()+"\""
                                    		+"}";
                    			} 
                    			else 
                    			{
                    				//失败
                    				System.out.println("ReturnCode:" + response.getReturnCode());
                    				System.out.println("ReturnMsg:" + response.getReturnMsg());
                    				jsonRsp="{"
                    						+"\"return_code\":\""+response.getReturnCode()+"\","
                    						+"\"return_msg\":\""+response.getReturnMsg()+"\","
                                    		+"\"msg_id\":\""+""+"\","
                                    		+"\"qrcode\":\""+""+"\","
                                    		+"\"attach\":\""+""+"\""
                                    		+"}";
                    			}
                    			pw.println(jsonRsp);
                				pw.close();
                    			System.out.println(jsonRsp);
                    			
                    		} catch (IcbcApiException e) {
                    			e.printStackTrace();
                    		}
						}
			else if(flag==-2){
    								os=client.getOutputStream();
    								pw=new PrintWriter(os);
    								pw.println("HTTP/1.0 404 Not Found");//返回应答消息,并结束应答
    								pw.println("Access-Control-Allow-Origin:*");
    								pw.println();// 根据 HTTP 协议, 空行将结束头信息
    								pw.println("{\"error\":\"not_found\",\"reason\":\"missing\"}");
    								pw.close();			
						}
			else
						{
							if(buffer[flag].buyervisit) {
								if(buffer[flag].issuccess) {
	                    			os=client.getOutputStream();
	                                pw=new PrintWriter(os);
	                                pw.println("HTTP/1.0 200 OK");//返回应答消息,并结束应答
	                                pw.println("Content-Type:text/html;charset=UTF-8;");
	                                pw.println("Access-Control-Allow-Origin:*");
	                                pw.println();// 根据 HTTP 协议, 空行将结束头信息
	                                pw.println(buffer[flag].content);
	                				pw.close();
	                				buffer[flag]=buffer[Account.begin];
	                				Account.begin++;
								}else {
	                    			os=client.getOutputStream();
	                                pw=new PrintWriter(os);
	                                pw.println("HTTP/1.0 502 Bad Gateway");//返回应答消息,并结束应答
	                                pw.println("Content-Type:text/html;charset=UTF-8;");
	                                pw.println("Access-Control-Allow-Origin:*");
	                                pw.println();// 根据 HTTP 协议, 空行将结束头信息
	                                pw.println(buffer[flag].content);
	                				pw.close();
	                				buffer[flag]=buffer[Account.begin];
	                				Account.begin++;
								}
							}
							else {
									buffer[flag].sellervisit=true;
									buffer[flag].client=client;
							}
						}
}else if(resource.equals("/pay")) {
		for(int i=Account.begin;i<Account.end;i++) {
			if(buffer[i%100].equal(jsonObject.getString("out_trade_no"))) {
				flag=i%100;
				break;
			}
		}
			if(flag>-1) {
							    QrcodePayRequestV2 request = new QrcodePayRequestV2();
							    //request.setServiceUrl("https://gw-api-iicamp.dccnet.com.cn/api/qrcode/V2/generate");
							    request.setServiceUrl("https://apisandbox.dccnet.com.cn/api/qrcode/V2/generate");
							    Calendar calendar = Calendar.getInstance();  
							    java.util.Date date = calendar.getTime();   
							    QrcodePayRequestV2Biz bizContent = new QrcodePayRequestV2Biz();
								bizContent.setMerId(jsonObject.getString("mer_id"));
								bizContent.setQrCode(jsonObject.getString("qr_code"));
								bizContent.setOutTradeNo(jsonObject.getString("out_trade_no"));
								bizContent.setOrderAmt(jsonObject.getString("order_amt"));
								bizContent.setTradeDate(sdf1.format(date));
								bizContent.setTradeTime(sdf2.format(date));
								request.setBizContent(bizContent);
								QrcodePayResponseV2 response = new QrcodePayResponseV2();
								try {
									response = ICBCclient.execute(request, "msgId");//msgId消息通讯唯一编号，要求每次调用独立生成，APP级唯一
									String jsonRsp;
									os=client.getOutputStream();
							        pw=new PrintWriter(os);
							        pw.println("HTTP/1.0 200 OK");//返回应答消息,并结束应答
							        pw.println("Content-Type:text/html;charset=UTF-8;");
							        pw.println("Access-Control-Allow-Origin:*");
							        pw.println();// 根据 HTTP 协议, 空行将结束头信息
									if (response.isSuccess()) {
										//6、业务成功处理，请根据接口文档用response.getxxx()获取同步返回的业务数据
										System.out.println("ReturnCode:"+response.getReturnCode());
										System.out.println("response:" + response);
										//{"return_code":"0","return_msg":"-","msg_id":"urcnl24ciutr9","qrcode":"示例值详见响应示例","attch":"-"}
										jsonRsp="{"
                                                +"\"msg_id\":\""+response.getMsgId()+"\","
                                                +"\"pay_status\":\""+response.getPayStatus()+"\","
                                                +"\"cust_id\":\""+response.getCustId()+"\","
                                                +"\"card_no\":\""+response.getCardNo()+"\","
                                                +"\"total_amt\":\""+response.getTotalAmt()+"\","
                                                +"\"point_amt\":\""+response.getPointAmt()+"\","
                                                +"\"ecoupon_amt\":\""+response.getEcouponAmt()+"\","
                                                +"\"mer_disc_amt\":\""+response.getMerDiscAmt()+"\","
                                                +"\"coupon_amt\":\""+response.getCouponAmt()+"\","
                                                +"\"bank_disc_amt\":\""+response.getBankDiscAmt()+"\","
                                                +"\"payment_amt\":\""+response.getPaymentAmt()+"\","
                                                +"\"out_trade_no\":\""+response.getOutTradeNo()+"\","
                                                +"\"order_id\":\""+response.getOrderId()+"\","
                                                +"\"pay_time\":\""+response.getPayTime()+"\","
                                                +"\"Trade_time\":\""+calendar.get(Calendar.YEAR)+","+(calendar.get(Calendar.MONTH)+1)+","+calendar.get(Calendar.DATE)+","+calendar.get(Calendar.HOUR_OF_DAY)+","+calendar.get(Calendar.MINUTE)+","+calendar.get(Calendar.SECOND)+","+calendar.get(Calendar.MILLISECOND)+"\","
                                                +"\"total_disc_amt\":\""+response.getTotalDiscAmt()+"\""
							            		+"}";
										buffer[flag].issuccess=true;
									} 
									else 
									{
										buffer[flag].issuccess=false;
										//失败
										System.out.println("ReturnCode:" + response.getReturnCode());
										System.out.println("ReturnMsg:" + response.getReturnMsg());
										jsonRsp="{"
												+"\"return_code\":\""+response.getReturnCode()+"\","
												+"\"return_msg\":\""+response.getReturnMsg()+"\","
							            		+"}";
									}
									buffer[flag].content=jsonRsp;
									pw.println(jsonRsp);
									pw.close();
									System.out.println(jsonRsp);
									
								} catch (IcbcApiException e) {
									e.printStackTrace();
								}
								if(buffer[flag].sellervisit) {
	                    			os=buffer[flag].client.getOutputStream();
	                                pw=new PrintWriter(os);
	                                pw.println("HTTP/1.0 200 OK");//返回应答消息,并结束应答
							        pw.println("Content-Type:text/html;charset=UTF-8;");
	                                pw.println("Access-Control-Allow-Origin:*");
	                                pw.println();// 根据 HTTP 协议, 空行将结束头信息
	                                pw.println(buffer[flag].content);
	                				pw.close();
	                				buffer[flag]=buffer[Account.begin];
	                				Account.begin++;
								}else {
									buffer[flag].buyervisit=true;
								}
								}
			else {
				os=client.getOutputStream();
				pw=new PrintWriter(os);
				pw.println("HTTP/1.0 404 Not Found");//返回应答消息,并结束应答
		        pw.println("Content-Type:text/html;charset=UTF-8;");
				pw.println("Access-Control-Allow-Origin:*");
				pw.println();// 根据 HTTP 协议, 空行将结束头信息
				pw.println("{\"error\":\"not_found\",\"reason\":\"missing\"}");
				pw.close();	
			}
							}
else if(resource.equals("/face")) {
	UiIcbcClient uiclient = new UiIcbcClient(APP_ID, MY_PRIVATE_KEY, IcbcConstants.CHARSET_UTF8);
	
	BasFaceFacesaddRequestV1 request = new BasFaceFacesaddRequestV1();
    request.setServiceUrl("https://gw-api-iicamp.dccnet.com.cn/api/bas/face/facesadd/V1");
    BasFaceFacesaddRequestV1Biz bizContent = new BasFaceFacesaddRequestV1Biz();
    bizContent.setId(jsonObject.getString("id"));
    bizContent.setImg1(jsonObject.getString("img1"));
    bizContent.setBaseFlag(0);
    bizContent.setChannel("TEST");
    bizContent.setAppName("工银e收款");
    bizContent.setPostMethod("0");
    request.setBizContent(bizContent);
    
    

    BasFaceFacesaddResponseV1 response = new BasFaceFacesaddResponseV1();
	try {
		response = ICBCclient.execute(request, "msgId");//msgId消息通讯唯一编号，要求每次调用独立生成，APP级唯一
		String jsonRsp;
		os=client.getOutputStream();
        pw=new PrintWriter(os);
        pw.println("HTTP/1.0 200 OK");//返回应答消息,并结束应答
        pw.println("Content-Type:text/html;charset=UTF-8;");
        pw.println("Access-Control-Allow-Origin:*");
        pw.println();// 根据 HTTP 协议, 空行将结束头信息
		if (response.isSuccess()) {
			//6、业务成功处理，请根据接口文档用response.getxxx()获取同步返回的业务数据
			System.out.println("ReturnCode:"+response.getReturnCode());
			System.out.println("response:" + response);
			//{"return_code":"0","return_msg":"-","msg_id":"urcnl24ciutr9","qrcode":"示例值详见响应示例","attch":"-"}
			jsonRsp="{"
                    +"\"msg_id\":\""+response.getMsgId()+"\","
                    +"\"result\":\""+response.getResult()+"\","
                    +"\"face_id\":\""+response.getFaceId()+"\""
            		+"}";
		}
		else 
		{
			//失败
			System.out.println("ReturnCode:" + response.getReturnCode());
			System.out.println("ReturnMsg:" + response.getReturnMsg());
			jsonRsp="{"
					+"\"return_code\":\""+response.getReturnCode()+"\","
					+"\"return_msg\":\""+response.getReturnMsg()+"\","
            		+"}";
		}
		pw.println(jsonRsp);
		pw.close();
		System.out.println(jsonRsp);
	}catch (IcbcApiException e) {
		e.printStackTrace();
	}
    
    
    
}


                        }
                        System.out.println("请求信息结束\n===================");
                        count++;
                        System.out.println("第" +count +"次请求");} catch(Exception e) {
                        System.out.println("HTTP服务器错误:"+e.getLocalizedMessage());
                    }
                }
                //System.out.println(client+"连接到HTTP服务器");//如果加入这一句,服务器响应速度会很慢
            } catch(Exception e) {
                System.out.println("HTTP服务器错误:"+e.getLocalizedMessage());
            }
        }
    }
	
    public static void main(String[] args) {
                try {
        			serverSocket=new ServerSocket(4444);
        		} catch (IOException e) {
        			// TODO Auto-generated catch block
        			e.printStackTrace();
        		}
                run();

    }
}