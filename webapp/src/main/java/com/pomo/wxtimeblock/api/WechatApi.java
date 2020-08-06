package com.pomo.wxtimeblock.api;

import cn.hutool.http.HttpUtil;
import com.pomo.wxtimeblock.constants.WxConstants;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wxapi")
public class WechatApi {

    @GetMapping(value = "/jscode2session")
    @ResponseBody
    public String getOpenIdMsg(String code) {
        return HttpUtil.get(WxConstants.JSCODE2SESSION_URL + code);
    }
}
