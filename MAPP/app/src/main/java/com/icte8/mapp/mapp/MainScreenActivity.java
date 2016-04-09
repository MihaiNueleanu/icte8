package com.icte8.mapp.mapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class MainScreenActivity extends AppCompatActivity {

    private View overviewButton;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_screen);

        overviewButton = findViewById(R.id.systemOverviewButton);

        overviewButton.setOnClickListener(
                new View.OnClickListener() {
                    @Override
                    public void onClick(View V) {
                        startActivity(new Intent(MainScreenActivity.this, SystemOverview.class));

                    }
                });
    }
}
