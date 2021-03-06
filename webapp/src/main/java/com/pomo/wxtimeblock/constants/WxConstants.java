package com.pomo.wxtimeblock.constants;

/**
 * @description: 微信请求设置信息
 * @author: liqiulin
 * @create: 2018-08-11 20:01
 */
public class WxConstants {

    public static final String APPID = "wx1d2e0320adaa9645";

    public static final String APP_SECRET = "42e94e7b7a5f75bb52af42af26305752";

    public static final String TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APP_SECRET;

    public static final String JSCODE2SESSION_URL = "https://api.weixin.qq.com/sns/jscode2session?appid=" + APPID + "&secret=" + APP_SECRET + "&grant_type=authorization_code" + "&js_code=";
}
