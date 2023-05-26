export default {
  'menu.system.setting': 'System Settings',
  'menu.system.user': 'Users Management',
  'menu.system.config': 'Configuration Management',
  'system.rules.value': 'value is required',
  'system.rules.url': 'URL format invalid',
  'user.password.modify': 'Modify Password',
  'user.password.default.modify': 'Modify Default Password',
  'user.password.oldPassword': 'Old password',
  'user.password.newPassword': 'New password',
  'user.password.confirmPassword': 'Confirm New password',
  'user.password.rules.oldpassword': 'Please enter old password',
  'user.password.rules.newpassword': 'Please enter new password',
  'user.password.rules.confirmpassword': 'Please enter the new password again',
  'user.password.rules.comparepassword':
    'The two new password entries are inconsisten',
  'user.login.info': 'Login information verification failed, please retry',
  'user.login.validate': 'Verification Failed',
  'user.login.relogin': 'Re-Login',
  'system.setting.serverManage': 'Server Management',
  'system.setting.serverurl': 'Server Address',
  'system.setting.interceptor': 'Analysis Management',
  'system.setting.mavenRepo': 'Repository URL',
  'system.setting.mavenRepo.desc':
    'Used to retrieve non-extranet-visible Maven repository artifacts during source code inspection',
  'system.setting.rules.mavenRepo':
    'The maven repository address must be http or https',
  'system.setting.pulldependce': 'whether to search online',
  'system.setting.pulldependce.desc':
    'Used to retrieve the transitive dependencies of the component, the latest version and license information of the component, etc',
  'system.setting.proxyManage': 'Proxy Management',
  'system.setting.wildDomain': 'Generic Domain',
  'system.setting.wildDomain.desc':
    'Used for proxy address composition and TLS certificate verification',
  'system.setting.tls': 'TLS mode',
  'system.setting.tls.desc':
    'Used to specify the TLS mode used for proxy access',
  'system.setting.customize': 'customize',
  'system.setting.customize.desc':
    'Use https mode in proxy addresses. The uploaded service certificate needs to support the above generic domain name as the DNS name. It is worth noting that if the service certificate is issued by a non-authoritative authority, the client (such as Maven, Docker) needs to complete the trust in advance.',
  'system.setting.terminate': 'Proxy terminate',
  'system.setting.terminate.desc':
    'Use https mode in proxy addresses. No service certificate is required, but a pre-proxy service is required for processing.',
  'system.setting.acme': 'Apply automatically',
  'system.setting.acme.desc':
    'Use https mode in proxy addresses. The service certificate is applied in the ACME DNS-01 mode, and the port 53 of the currently deployed machine needs to be opened to receive the UDP authentication request from the certificate provider',
  'system.setting.disabled': 'Disabled',
  'system.setting.disabled.desc': 'Use http mode in proxy addresses.',
  'system.setting.customize.lisence': 'customize certificate',
  'system.setting.customize.key': 'Customize private key',
  'system.setting.rules.genericdomain':
    'The generic domain name format is incorrect',
  'system.setting.offlineManage': 'Offline management',
  'system.setting.offlineManage.httpProxy':
    'The http protocol uses the proxy service address',
  'system.setting.offlineManage.httpProxy.desc':
    'HTTP outbound traffic for proxying non-TLS in offline environment',
  'system.setting.offlineManage.httpsProxy':
    'The https protocol uses the proxy service address',
  'system.setting.offlineManage.httpsProxy.desc':
    'HTTP outbound traffic for proxying TLS in offline environment',
  'system.setting.offlineManage.allProxy': 'Proxy service address',
  'system.setting.offlineManage.allProxy.desc':
    'Used to proxy all outbound traffic in an offline environment',
  'system.setting.offlineManage.noProxy':
    "Do not use a proxy's domain name or IP",
  'system.setting.offlineManage.noProxy.desc':
    'Used to not proxy outbound traffic for matching domain names and IPs in offline environment',
  'system.setting.rules.socks':
    'Only addresses for socks4 and socks5 protocols',
  'system.setting.offlineManage.noProxy.extra':
    "list of IPs、domain name with ',' separated;supporting fuzzy matching;e.g.:192.168.0.*,*ip.net",
  'system.setting.rules.noProxy': 'The input format is incorrect',
  'system.setting.TokenRefreshCronExpr': 'System token refresh cycle',
  'system.setting.TokenRefreshCronExpr.desc':
    'The system token is used for third-party service call authentication and is refreshed every 6 hours by default',
  'system.setting.ScanCheckCronExpr': 'Resource scan check cycle',
  'system.setting.ScanCheckCronExpr.desc':
    'Periodically check whether to perform a scan on the project, by default every 1 hour',
  'system.setting.MetaSyncCronExpr': 'Data synchronization period',
  'system.setting.MetaSyncCronExpr.desc':
    'Periodically sync data, including but not limited to licenses and vulnerabilities, every 24 hours by default',
  'system.setting.cron.desc': 'The format is a cron expression',
  'system.setting.rules.cron': 'The expression is not in the correct format',
  'system.setting.cron.extra':
    'Cron expression: seconds  minute  hour  day(month)  month  day(week)',
  'system.setting.analyze.ApplyVulnerabilityPrioritization':
    'whether to apply vulnerability prioritization (experimental)',
  'system.setting.analyze.VulnPrioritization.desc':
    "When disabled, the retrieved vulnerability results will be sorted based on the vulnerability's CVSS basic score; changing the setting may affect the newly retrieved vulnerability results and violations that have ignored",
  'system.setting.analyze.fixAdvice':
    'Maximum number of versions analyzed per package per fix',
  'system.setting.analyze.fixAdvice.desc':
    'Increasing the number will take more time to generate fix advice.',
  'system.setting.analyze.goproxy.desc':
    'The repository(GOPROXY) is used for resolving Go modules and fetching module information',
  'system.setting.analyze.goprivate.desc':
    'The GOPRIVATE environment variable controls which modules the go command considers to be private and should therefore not use the proxy or checksum database.',
  'system.setting.analyze.gonoproxy.desc':
    'List of glob patterns of module path prefixes that should always be fetched directly or that should not be compared against the checksum database.',
  'system.setting.analyze.repoconfig': 'Repository Configuration',
  'system.setting.analyze.enableFixAdvice': 'whether to enable fix advice',
  'system.setting.rule.openai': 'openai api token is required',
  'system.setting.task': 'Task Settings',
  'system.setting.task.basic': 'Basic Task',
  'system.setting.task.basicmng': 'Basic Management',
  'system.setting.task.finops': 'FinOps Task',
  'system.setting.task.enhance': 'Enhanced Management',
  'system.setting.openAiApiToken': 'OpenAI API Token',
  'system.setting.TerraformDeployerImage': 'Terraform Deployer Image',
  'system.setting.ConnectorCheckCronExpr': 'Check Connector Status',
  'system.setting.ConnectorCheckCronExpr.desc':
    'The default is to execute every 10 minutes',
  'system.setting.ResourceStatusCheckCronExpr':
    'Check application resource status',
  'system.setting.ResourceStatusCheckCronExpr.desc':
    'The default is to execute every 1 minute',
  'system.setting.ResourceLabelApplyCronExpr': 'Tag application resources',
  'system.setting.ResourceLabelApplyCronExpr.desc':
    'The default is to execute every 2 minutes',
  'system.setting.CostCollectCronExpr': 'Collect usage costs',
  'system.setting.CostCollectCronExpr.desc':
    'The default is to execute every hour',
  'system.user.visitor': 'Visitor',
  'system.user.admin': 'Administrator',
  'system.user.engineer': 'Platform Engineer'
};