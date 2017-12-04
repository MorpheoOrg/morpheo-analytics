# create the boto file
echo "[Credentials]" >> $USERPROFILE\.boto
echo "gs_access_key_id = $ACCESS_KEY_ID" >> $USERPROFILE\.boto
echo "gs_secret_access_key = $SECRET_ACCESS_KEY" >> $USERPROFILE\.boto

echo "[GSUtil]" >> $USERPROFILE\.boto
echo "default_project_id = $PROJECT_ID" >> $USERPROFILE\.boto

cat $USERPROFILE\.boto

# copy file on gcs
gsutil cp -a public-read release/*_win.exe gs://morpheo_analytics
gsutil cp -a public-read release/*_win.exe gs://morpheo_analytics/analytics_latest_win.exe